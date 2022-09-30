import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { TasksResponse, EditTask } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchTask } from "../../hooks/useFetchTask";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { TasksForm } from "../models/task/TasksForm";
import { BackButton } from "../ui/BackButton";

const TasksEdit: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { task: taskData } = useFetchTask({ action: "edit" });

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
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline,
        rate_of_progress: task.rate_of_progress,
      },
    };

    axiosInstance(updateOptions)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "タスクを更新しました",
        });
        navigate(`/users/${currentUser?.id}`, { replace: false });
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
    <Grid2 container direction="column" rowSpacing={3} width={700}>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BackButton />
          <Typography gutterBottom variant="h4" component="div">
            タスクを編集する
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <TasksForm
          action="edit"
          task={task}
          onChange={handleInputChange}
          deadline={deadline}
          onChangeDeadline={handleDeadlineChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button variant="contained" type="submit" onClick={handleTasksUpdate}>
          完了
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TasksEdit;
