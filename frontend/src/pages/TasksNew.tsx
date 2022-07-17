import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Container, MenuItem, TextField } from "@mui/material";
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
    is_done: false,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const priorities = [
    {
      value: "low",
      label: "低",
    },
    {
      value: "medium",
      label: "中",
    },
    {
      value: "high",
      label: "高",
    },
  ];

  const [priority, setPriority] = useState<string>("low");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
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
        priority,
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
    <Container maxWidth="sm">
      <h1>タスクを作成する</h1>
      <div>
        <TextField
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
          select
          label="優先度"
          name="priority"
          value={priority}
          onChange={handleChange}
        >
          {priorities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <br />
      <Button variant="contained" type="submit" onClick={handleTasksCreate}>
        完了
      </Button>
    </Container>
  );
};

export default TasksNew;
