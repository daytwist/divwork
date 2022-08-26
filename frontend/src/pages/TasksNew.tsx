import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { TasksResponse, newTask } from "../types";
import { AuthContext } from "../providers/AuthProvider";
import { PriorityTextField } from "../components/PriorityTextField";
import { DeadlineTextField } from "../components/DeadlineTextField";
import { SnackbarContext } from "../providers/SnackbarProvider";

const TasksNew: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [task, setTask] = useState<newTask>({
    title: "",
    description: "",
    is_done: false,
  });

  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>("low");

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
        deadline,
        priority,
        is_done: task.is_done,
        user_id: currentUser?.id,
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);

        if (res.status === 201) {
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "タスクを作成しました",
          });
          navigate(`/users/${currentUser?.id}`, { replace: false });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          message: `${err.response.data.messages.join("。")}`,
        });
      });
  };

  return (
    <div>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4" component="div">
            タスクを作成する
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="タイトル"
            variant="standard"
            sx={{ width: "30ch" }}
            name="title"
            value={task.title}
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
            value={task.description}
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
          <Button variant="contained" type="submit" onClick={handleTasksCreate}>
            完了
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksNew;
