import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Task, User, UsersResponse } from "../types";
import { axiosInstance } from "../utils/axios";

type Props = {
  action: string;
  flag: boolean | undefined;
};

export const useFetchUser = (props: Props) => {
  const { action, flag } = props;
  const params = useParams<{ id: string }>();

  const [user, setUser] = useState<User>();
  const [unfinishedTasks, setunfinishedTasks] = useState<Task[]>([]);
  const [finishedTasks, setfinishedTasks] = useState<Task[]>([]);

  let url = "";
  if (action === "edit") {
    url = `/users/${params.id}/edit`;
  } else {
    url = `/users/${params.id}`;
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
      .then((res: AxiosResponse<UsersResponse>) => {
        console.log(res);
        setUser(res?.data.user);
        setunfinishedTasks(res?.data.unfinished_tasks);
        setfinishedTasks(res?.data.finished_tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params, action, flag]);

  return { user, unfinishedTasks, finishedTasks };
};
