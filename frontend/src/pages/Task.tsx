import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowTaskResponse, Task } from "../interfaces";
import { axiosInstance } from "../utils/axios";

const ShowTask: React.FC = () => {
  const [task, setTask] = useState<Task>();
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/tasks/${params.id}`,
    method: "GET",
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<ShowTaskResponse>) => {
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
      <h1>Show Task</h1>
      <h2>{params.id}</h2>
      <h2>{task?.title}</h2>
      <h3>{task?.description}</h3>
    </div>
  );
};

export default ShowTask;
