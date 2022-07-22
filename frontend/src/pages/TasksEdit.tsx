import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Container, TextField } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksResponse, editTask } from "../types";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchTask } from "../hooks/useFetchTask";

const TasksEdit: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const data = useFetchTask();

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

  useEffect(() => {
    if (data) setTask(data);
  }, [data]);

  return (
    <Container maxWidth="sm">
      <h1>タスクを編集する</h1>
      <div>
        <TextField
          label="タイトル"
          variant="standard"
          name="title"
          value={task?.title}
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
          value={task?.description}
          onChange={handleInputChange}
        />
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
      <Button variant="contained" type="submit" onClick={handleTasksUpdate}>
        完了
      </Button>
    </Container>
  );
};

export default TasksEdit;
