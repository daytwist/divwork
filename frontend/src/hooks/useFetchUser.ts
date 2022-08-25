import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task, User, UsersResponse } from "../types";
import { axiosInstance } from "../utils/axios";

export const useFetchUser = () => {
  const [user, setUser] = useState<User>();
  const [unfinishedTasks, setUnfinishedTasks] = useState<Task[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/users/${params.id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<UsersResponse>) => {
        console.log(res);
        setUser(res?.data.user);
        setUnfinishedTasks(res?.data.unfinished_tasks);
        setFinishedTasks(res?.data.finished_tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { user, unfinishedTasks, finishedTasks };
};