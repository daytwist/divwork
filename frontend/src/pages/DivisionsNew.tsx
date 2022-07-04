import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newTask, TasksResponse, DivisionsCreateResponse } from "../types";
import { axiosInstance } from "../utils/axios";

const DivisionsNew: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<newTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    is_done: false,
    user_id: 0,
    parent_id: 0,
  });

  const [comment, setComment] = useState<string>("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleDivisionsCreate = () => {
    const options: AxiosRequestConfig = {
      url: `/tasks/${params.id}/divisions`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: { task, division: { comment } },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<DivisionsCreateResponse>) => {
        console.log(res);

        if (res.status === 200) {
          navigate(`/users/${res.data.division.user_id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

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
          <input name="user_id" onChange={handleInputChange} />
        </label>
      </div>
      <br />
      <div>
        <label>
          コメント
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
      </div>
      <br />
      <button type="submit" onClick={handleDivisionsCreate}>
        分担する
      </button>
    </div>
  );
};

export default DivisionsNew;
