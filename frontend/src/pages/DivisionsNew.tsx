import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task, TasksShowResponse } from "../types";
import { axiosInstance } from "../utils/axios";

const DivisionsNew: FC = () => {
  const [task, setTask] = useState<Task>();
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/tasks/${params.id}/divisions/new`,
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
        console.log(res.data);
        setTask(res.data.task);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Divisions#New</h1>
      <input value={task?.title} />
    </div>
  )
}

export default DivisionsNew;
