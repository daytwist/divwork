import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksShowResponse, Task } from "../types";

const TasksShow: FC = () => {
  const [task, setTask] = useState<Task>();
  const params = useParams<{ id: string }>();

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
        const { data } = res;
        console.log(data);
        console.log(params);
        setTask(data?.task);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1>Tasks#Show</h1>
      <h2>{params.id}</h2>
      <h2>{task?.title}</h2>
      <h3>{task?.description}</h3>
    </div>
  );
};

export default TasksShow;
