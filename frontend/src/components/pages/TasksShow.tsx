import { FC, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import LinkIcon from "@mui/icons-material/Link";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { useFetchTask } from "../../hooks/useFetchTask";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { PriorityLabel } from "../models/task/PriorityLabel";
import { DatetimeFormat } from "../ui/DatetimeFormat";
import { TasksDeleteIconButton } from "../models/task/TasksDeleteIconButton";
import { IsDoneUpdateButton } from "../models/task/IsDoneUpdateButton";
import { Task, TasksResponse } from "../../types";

const TasksShow: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const { task: taskData, childrenTasks, division } = useFetchTask();
  const params = useParams<{ id: string }>();

  const [task, setTask] = useState<Task>();

  const handleIsDoneUpdate = () => {
    const options: AxiosRequestConfig = {
      url: `/tasks/${task?.id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: { is_done: !task?.is_done },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);
        setTask(res.data.task);

        if (res.status === 200) {
          handleSetSnackbar({
            open: true,
            type: "success",
            message: task?.is_done
              ? "タスクを未了にしました"
              : "タスクを完了済みにしました",
          });
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
    }
  }, [taskData]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            タスク詳細
          </Typography>
        </Grid>
        <Grid item>
          <Card sx={{ minWidth: 500, p: 2 }}>
            <CardHeader
              title={
                <Typography variant="h5" component="div">
                  {task?.title}
                </Typography>
              }
              subheader={
                <div>
                  {division ? (
                    <Stack direction="row" mt={1}>
                      <PeopleIcon
                        sx={{
                          width: 18,
                          height: 18,
                          mr: 1,
                        }}
                      />
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        component="div"
                      >
                        親タスクから分担されました
                      </Typography>
                    </Stack>
                  ) : null}
                  {childrenTasks.length ? (
                    <Stack direction="row" mt={1}>
                      <PeopleIcon
                        sx={{
                          width: 18,
                          height: 18,
                          mr: 1,
                        }}
                      />
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        component="div"
                      >
                        子タスクへ分担されました
                      </Typography>
                    </Stack>
                  ) : null}
                </div>
              }
              action={
                task?.user_id === currentUser?.id &&
                task?.is_done === false && (
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="編集" placement="top" arrow>
                      <IconButton
                        component={Link}
                        to={`/tasks/${task?.id}/edit`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <TasksDeleteIconButton taskId={params.id} />
                  </Stack>
                )
              }
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                component="div"
                color="text.secondary"
              >
                詳細
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                {task?.description}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                color="text.secondary"
              >
                納期
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                {DatetimeFormat(task?.deadline)}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                color="text.secondary"
              >
                優先度
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                {PriorityLabel(task?.priority)}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                color="text.secondary"
              >
                完了フラグ
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                {task?.is_done.toString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Stack direction="row" spacing={2}>
                <IsDoneUpdateButton
                  onClick={handleIsDoneUpdate}
                  disabled={false}
                  isFinished={task?.is_done}
                />
                {task?.is_done === false && (
                  <Button
                    variant="contained"
                    type="button"
                    component={Link}
                    to={`/tasks/${task?.id}/divisions/new`}
                  >
                    分担する
                  </Button>
                )}
              </Stack>
            </CardActions>
          </Card>
        </Grid>
        {division ? (
          <Grid item>
            <Card sx={{ minWidth: 500, p: 2 }}>
              <CardHeader title="親タスク情報" />
              <CardContent>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="text.secondary"
                    sx={{ textAlign: "end", width: 85, mr: 1 }}
                  >
                    From:
                  </Typography>
                  <Typography variant="body1" component="div">
                    {division.user.name}
                  </Typography>
                </Stack>
                {division.comment ? (
                  <Stack direction="row" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                      sx={{ textAlign: "end", width: 85, mr: 1 }}
                    >
                      コメント:
                    </Typography>
                    <Typography variant="body1" component="div">
                      {division.comment}
                    </Typography>
                  </Stack>
                ) : null}
                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="text.secondary"
                    sx={{ textAlign: "end", width: 85, mr: 1 }}
                  >
                    参照リンク:
                  </Typography>
                  <IconButton component={Link} to={`/tasks/${task?.parent_id}`}>
                    <LinkIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ) : null}
        {childrenTasks.length ? (
          <Grid item>
            <Card sx={{ minWidth: 500, p: 2 }}>
              <CardHeader title="子タスク情報" />
              <CardContent>
                <Divider sx={{ mb: 2 }} />
                {childrenTasks?.map((childTask) => (
                  <div key={childTask.id}>
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="text.secondary"
                        sx={{ textAlign: "end", width: 85, mr: 1 }}
                      >
                        From:
                      </Typography>
                      <Typography variant="body1" component="div">
                        {childTask.division.user.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="text.secondary"
                        sx={{ textAlign: "end", width: 85, mr: 1 }}
                      >
                        To:
                      </Typography>
                      <Typography variant="body1" component="div">
                        {childTask.user.name}
                      </Typography>
                    </Stack>
                    {childTask.division.comment ? (
                      <Stack direction="row" alignItems="center">
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                          sx={{ textAlign: "end", width: 85, mr: 1 }}
                        >
                          コメント:
                        </Typography>
                        <Typography variant="body1" component="div">
                          {childTask.division.comment}
                        </Typography>
                      </Stack>
                    ) : null}
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="text.secondary"
                        sx={{ textAlign: "end", width: 85, mr: 1 }}
                      >
                        参照リンク:
                      </Typography>
                      <IconButton
                        component={Link}
                        to={`/tasks/${childTask.id}`}
                      >
                        <LinkIcon />
                      </IconButton>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default TasksShow;
