import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChildrenTask, Division, Task, TasksShowResponse } from "../types";
import { axiosInstance } from "../utils/axios";

export const useFetchTask = () => {
  const params = useParams<{ id: string }>();

  const [task, setTask] = useState<Task>();
  const [childrenTasks, setChildrenTasks] = useState<ChildrenTask[]>([]);
  const [division, setDivision] = useState<Division>();

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
        setChildrenTasks(res.data.children_tasks);
        setDivision(res.data.division);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { task, childrenTasks, division };
};
