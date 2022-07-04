import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksResponse, Task } from "../types";

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
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);
        setTask(res?.data.task);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Tasks#Show</h1>
      <h2>{task?.title}</h2>
      <h3>{task?.description}</h3>
      <div>
        <Link to={`/tasks/${task?.id}/divisions/new`}>
          <button type="button">分担する</button>
        </Link>
      </div>
    </div>
  );
};

export default TasksShow;
