import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newTask, TasksResponse } from "../types";
import { axiosInstance } from "../utils/axios";

const DivisionsNew: FC = () => {
  const [task, setTask] = useState<newTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    is_done: false,
    user_id: 0,
    parent_id: 0,
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
        <label>
          タイトル
          <input name="title" value={task.title} onChange={handleInputChange} />
        </label>
      </div>
      <br />
      <div>
        <label>
          詳細
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          納期
          <input
            type="text"
            name="deadline"
            value={task.deadline}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          優先度
          <input
            name="priority"
            value={task.priority}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          送信先ユーザー
          <input
            name="user_id"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <button type="submit">分担する</button>
    </div>
  );
};

export default DivisionsNew;
