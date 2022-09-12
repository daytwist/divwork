import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { TasksResponse, EditTask } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchTask } from "../../hooks/useFetchTask";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { TasksForm } from "../models/task/TasksForm";

const TasksEdit: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { task: taskData } = useFetchTask();

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
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "タスクを更新しました",
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

  useEffect(() => {
    if (taskData) {
      setTask(taskData);
      setDeadline(taskData.deadline);
    }
  }, [taskData]);

  return (
    <div>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h4" component="div">
            タスクを編集する
          </Typography>
        </Grid>
        <Grid item>
          <TasksForm
            action="edit"
            task={task}
            onChange={handleInputChange}
            deadline={deadline}
            onChangeDeadline={handleDeadlineChange}
            onClick={handleTasksUpdate}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksEdit;
