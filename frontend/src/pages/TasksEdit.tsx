import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksResponse, editTask } from "../types";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchTask } from "../hooks/useFetchTask";

const TasksEdit: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [task, setTask] = useState<editTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    is_done: false,
    user_id: 0,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const data = useFetchTask();
  if (data) setTask(data);

  const params = useParams<{ id: string }>();

  const handleTasksUpdate = () => {
    const updateOptions: AxiosRequestConfig = {
      url: `/tasks/${params.id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: task,
    };

    axiosInstance(updateOptions)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);

        if (res.status === 200) {
          navigate(`/users/${currentUser?.id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Tasks#Edit</h1>
      <div>
        <label>
          タイトル
          <input
            name="title"
            value={task?.title}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          詳細
          <textarea
            name="description"
            value={task?.description}
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
            value={task?.deadline}
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
            value={task?.priority}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <button type="submit" onClick={handleTasksUpdate}>
        更新する
      </button>
    </div>
  );
};

export default TasksEdit;
