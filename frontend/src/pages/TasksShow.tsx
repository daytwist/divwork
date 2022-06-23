import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksShowResponse, Task } from "../interfaces";
import { axiosInstance } from "../utils/axios";

const TasksShow: React.FC = () => {
  const [task, setTask] = useState<Task>();
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/tasks/${params.id}`,
    method: "GET",
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
