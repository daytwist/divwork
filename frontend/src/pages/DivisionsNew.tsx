import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksResponse } from "../types";
import { axiosInstance } from "../utils/axios";

type newTask = {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  is_done: boolean;
  user_id: number | null;
  parent_id: number | null;
};

const DivisionsNew: FC = () => {
  const [task, setTask] = useState<newTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    is_done: false,
    user_id: null,
    parent_id: null,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

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
      .then((res: AxiosResponse<TasksResponse>) => {
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
      <div>
        <p>タイトル</p>
        <input name="title" value={task.title} onChange={handleInputChange} />
      </div>
      <div>
        <p>詳細</p>
        <textarea
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p>納期</p>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p>優先度</p>
        <input
          name="priority"
          value={task.priority}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">分担する</button>
    </div>
  );
};

export default DivisionsNew;
