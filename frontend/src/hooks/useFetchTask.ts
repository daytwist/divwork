import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ParentTask,
  DivisionIncludeUserAvatar,
  Task,
  TasksShowResponse,
  User,
  ChildTask,
} from "../types";
import { axiosInstance } from "../utils/axios";

export const useFetchTask = () => {
  const params = useParams<{ id: string }>();

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
      });
  }, [params]);

  return { task, user, parentTask, childrenTasks, division };
};
