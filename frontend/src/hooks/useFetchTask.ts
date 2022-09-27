import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ParentTask,
  DivisionIncludeUserAvatar,
  Task,
  TasksShowResponse,
  User,
  ChildTask,
} from "../types";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const useFetchTask = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>();
  const [user, setUser] = useState<User>();
  const [parentTask, setParentTask] = useState<ParentTask>();
  const [childrenTasks, setChildrenTasks] = useState<ChildTask[]>([]);
  const [division, setDivision] = useState<DivisionIncludeUserAvatar>();

  const options: AxiosRequestConfig = {
    url: `/tasks/${params.id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TasksShowResponse>) => {
        console.log(res);
        setTask(res?.data.task);
        setUser(res.data.user);
        setParentTask(res.data.parent_task);
        setChildrenTasks(res.data.children_tasks);
        setDivision(res.data.division);
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: `${err.response.data.messages}`,
        });
        navigate(`/teams/${currentUser?.team_id}`, { replace: true });
      });
  }, [params]);

  return { task, user, parentTask, childrenTasks, division };
};
