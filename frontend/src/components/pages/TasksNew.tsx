import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { TasksResponse, EditTask } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { TasksForm } from "../models/task/TasksForm";

const TasksNew: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [task, setTask] = useState<EditTask>({
    title: "",
    description: "",
    priority: "",
    rate_of_progress: 0,
    user_id: 0,
  });
  const [deadline, setDeadline] = useState<Date | null>(new Date());

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleDeadlineChange = (newValue: Date | null) => {
    setDeadline(newValue);
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
        priority: task.priority,
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
          <TasksForm
            action="new"
            task={task}
            onChange={handleInputChange}
            deadline={deadline}
            onChangeDeadline={handleDeadlineChange}
            onClick={handleTasksCreate}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksNew;
