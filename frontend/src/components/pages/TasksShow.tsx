import { FC, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { useFetchTask } from "../../hooks/useFetchTask";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { DatetimeFormat } from "../ui/DatetimeFormat";
import { TasksDeleteIconButton } from "../models/task/TasksDeleteIconButton";
import { IsDoneUpdateButton } from "../models/task/IsDoneUpdateButton";
import { Task, TasksResponse } from "../../types";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { UserNameHeader } from "../models/user/UserNameHeader";
import { ChildrenTasksDetails } from "../models/task/ChildrenTasksDetails";
import { ParentTaskDetails } from "../models/task/ParentTaskDetails";
import { TaskContentTypography } from "../models/task/TaskContentTypography";
import { PriorityStack } from "../models/task/PriorityStack";

const TasksShow: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const {
    task: taskData,
    user,
    parentTask,
    childrenTasks,
    division,
  } = useFetchTask();
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
      data: !task?.is_done
        ? {
            is_done: !task?.is_done,
            rate_of_progress: 100,
          }
        : {
            is_done: !task?.is_done,
          },
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
      window.scrollTo(0, 0);
    }
  }, [taskData]);

  return (
    <div>
      {task ? (
        <div>
          <Grid2
            container
            direction="column"
            spacing={3}
            alignContent="center"
            width={700}
          >
            <Grid2 xs={12}>
              <UserNameHeader user={user} />
            </Grid2>
            <Grid2 xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader
                  title={
                    <Typography variant="h5" component="div">
                      {task.title}
                    </Typography>
                  }
                  subheader={
                    <Grid2
                      container
                      direction="column"
                      spacing={1}
                      p={0}
                      mt={1}
                    >
                      <Grid2 xs={12}>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                          component="div"
                        >
                          登録日：{DatetimeFormat(task.created_at)}
                        </Typography>
                      </Grid2>
                      {division ? (
                        <Grid2 xs={12}>
                          <Stack direction="row">
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
                        </Grid2>
                      ) : null}
                      {childrenTasks.length ? (
                        <Grid2 xs={12}>
                          <Stack direction="row">
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
                        </Grid2>
                      ) : null}
                    </Grid2>
                  }
                  action={
                    task?.user_id === currentUser?.id && (
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
                  <Grid2 container rowSpacing={2} pt={0} px={0} pb={2}>
                    {task.description ? (
                      <Grid2 xs={12}>
                        <TaskContentTypography
                          subtitle="詳細"
                          body={task.description}
                        />
                      </Grid2>
                    ) : null}
                    <Grid2 xs={6}>
                      <PriorityStack value={task.priority} />
                    </Grid2>
                    <Grid2 xs={6}>
                      <TaskContentTypography
                        subtitle="納期"
                        body={DatetimeFormat(task.deadline)}
                      />
                    </Grid2>
                    <Grid2 xs={6}>
                      <TaskContentTypography
                        subtitle="ステータス"
                        body={task.is_done ? "完了済み" : "未了"}
                      />
                    </Grid2>
                    <Grid2 xs={6}>
                      <TaskContentTypography
                        subtitle="進捗率"
                        body={`${task.rate_of_progress}%`}
                      />
                    </Grid2>
                    <Grid2 xs={6}>
                      {task.is_done ? (
                        <TaskContentTypography
                          subtitle="完了日"
                          body={DatetimeFormat(task.updated_at)}
                        />
                      ) : null}
                    </Grid2>
                  </Grid2>
                </CardContent>
                <CardActions>
                  <Stack direction="row" spacing={2}>
                    <IsDoneUpdateButton
                      onClick={handleIsDoneUpdate}
                      disabled={false}
                      isFinished={task.is_done}
                    />
                    {task.is_done ? null : (
                      <Button
                        variant="contained"
                        type="button"
                        component={Link}
                        to={`/tasks/${task.id}/divisions/new`}
                        startIcon={<ConnectWithoutContactIcon />}
                      >
                        分担する
                      </Button>
                    )}
                  </Stack>
                </CardActions>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              {division && parentTask ? (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    親タスク情報
                  </AccordionSummary>
                  <AccordionDetails>
                    <ParentTaskDetails
                      division={division}
                      parentTask={parentTask}
                    />
                  </AccordionDetails>
                </Accordion>
              ) : null}
              {childrenTasks.length ? (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    子タスク情報
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChildrenTasksDetails childrenTasks={childrenTasks} />
                  </AccordionDetails>
                </Accordion>
              ) : null}
            </Grid2>
          </Grid2>
        </div>
      ) : (
        <LoadingColorRing />
      )}
    </div>
  );
};

export default TasksShow;
