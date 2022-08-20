import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksResponse, editTask } from "../types";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchTask } from "../hooks/useFetchTask";
import { PriorityTextField } from "../components/PriorityTextField";
import { DeadlineTextField } from "../components/DeadlineTextField";

const TasksEdit: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const data = useFetchTask();

  const [task, setTask] = useState<editTask>({
    title: "",
    description: "",
    is_done: false,
    user_id: 0,
  });

  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>("low");

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
    if (data) {
      setTask(data);
      setDeadline(data.deadline);
      setPriority(data.priority);
    }
  }, [data]);

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4" component="div">
            タスクを編集する
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="タイトル"
            variant="standard"
            sx={{ width: "30ch" }}
            name="title"
            value={task?.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="詳細"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: "55ch" }}
            name="description"
            value={task?.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <DeadlineTextField
            value={deadline}
            onChange={(newValue) => {
              setDeadline(newValue);
            }}
          />
        </Grid>
        <Grid item>
          <PriorityTextField
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" onClick={handleTasksUpdate}>
            完了
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TasksEdit;
