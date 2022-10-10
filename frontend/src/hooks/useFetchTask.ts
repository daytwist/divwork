import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { User } from "../types/userTypes";
import {
  ParentTask,
  Task,
  TasksShowResponse,
  ChildTask,
} from "../types/taskTypes";
import { DivisionIncludeUserAvatar } from "../types/divisionTypes";
import { axiosInstance } from "../utils/axios";
import { SnackbarContext } from "../providers/SnackbarProvider";

type Props = {
  action: string;
};

export const useFetchTask = (props: Props) => {
  const { action } = props;
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>();
  const [user, setUser] = useState<User>();
  const [parentTask, setParentTask] = useState<ParentTask>();
  const [childrenTasks, setChildrenTasks] = useState<ChildTask[]>([]);
  const [division, setDivision] = useState<DivisionIncludeUserAvatar>();

  let url = "";
  if (action === "edit") {
    url = `/tasks/${params.id}/edit`;
  } else {
    url = `/tasks/${params.id}`;
  }

  const options: AxiosRequestConfig = {
    url,
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
        navigate("/teams", { replace: true });
      });
  }, [params, action]);

  return { task, user, parentTask, childrenTasks, division };
};
