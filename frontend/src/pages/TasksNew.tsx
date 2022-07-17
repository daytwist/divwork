import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TextField } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksResponse, newTask } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const TasksNew: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [task, setTask] = useState<newTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    is_done: false,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleTasksCreate = () => {
    const options: AxiosRequestConfig = {
      url: "/tasks",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: {
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        is_done: task.is_done,
        user_id: currentUser?.id,
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);

        if (res.status === 201) {
          navigate(`/users/${currentUser?.id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Tasks#New</h1>
      <div>
        <TextField
          id="standard-basic"
          label="タイトル"
          variant="standard"
          name="title"
          value={task.title}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <TextField
          id="standard-basic"
          label="詳細"
          variant="standard"
          multiline
          rows={3}
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <TextField
          id="standard-basic"
          label="納期"
          variant="standard"
          type="text"
          name="deadline"
          value={task.deadline}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <TextField
          id="standard-basic"
          label="優先度"
          variant="standard"
          name="priority"
          value={task.priority}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <button type="submit" onClick={handleTasksCreate}>
        作成する
      </button>
    </div>
  );
};

export default TasksNew;
