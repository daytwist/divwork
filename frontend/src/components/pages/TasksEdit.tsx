import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { TasksResponse, EditTask } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchTask } from "../../hooks/useFetchTask";
import { PriorityTextField } from "../models/task/PriorityTextField";
import { DeadlineTextField } from "../models/task/DeadlineTextField";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const TasksEdit: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { task: taskData } = useFetchTask();

  const [task, setTask] = useState<EditTask>({
    title: "",
    description: "",
    rate_of_progress: 0,
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
      setPriority(taskData.priority);
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
          <TextField
            label="タイトル"
            variant="outlined"
            sx={{ width: "50ch" }}
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
            sx={{ width: "50ch" }}
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={5}>
            <PriorityTextField
              value={priority}
              onChange={(event) => {
                setPriority(event.target.value);
              }}
            />
            <DeadlineTextField
              value={deadline}
              onChange={(newValue) => {
                setDeadline(newValue);
              }}
            />
          </Stack>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "10ch" }}>
            <InputLabel htmlFor="rate-of-progress">進捗率</InputLabel>
            <OutlinedInput
              id="rate-of-progress"
              label="進捗率"
              type="number"
              name="rate_of_progress"
              value={task.rate_of_progress}
              onChange={handleInputChange}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" onClick={handleTasksUpdate}>
            完了
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksEdit;
