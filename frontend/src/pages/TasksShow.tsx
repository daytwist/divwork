import { FC, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { useFetchTask } from "../hooks/useFetchTask";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { PriorityLabel } from "../components/PriorityLabel";
import { DeadlineFormat } from "../components/DeadlineFormat";
import { AlertDialog } from "../components/AlertDialog";

const TasksShow: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { task, childrenTasks, division } = useFetchTask();

  const childrenTasksCount = childrenTasks.length;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTasksDelete = () => {
    const options: AxiosRequestConfig = {
      url: `/tasks/${params.id}`,
      method: "DELETE",
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse) => {
        console.log(res);

        if (res.status === 200) {
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "タスクを削除しました",
          });
          navigate(`/users/${currentUser?.id}`, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.errors,
        });
      });
  };

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
                  {childrenTasksCount ? (
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
                    <Tooltip title="削除" placement="top" arrow>
                      <IconButton
                        onClick={handleClickOpen}
                        data-testid="delete-button"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <AlertDialog
                      open={open}
                      handleClose={handleClose}
                      objectName="タスク"
                      onClick={handleTasksDelete}
                    />
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
                {DeadlineFormat(task?.deadline)}
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
                    sx={{ mr: 1 }}
                  >
                    From:
                  </Typography>
                  <Typography variant="body1" component="div">
                    {division.user.name}
                  </Typography>
                </Stack>
                <Typography
                  variant="subtitle1"
                  component="div"
                  color="text.secondary"
                >
                  コメント：
                </Typography>
                <Typography variant="body1" component="div">
                  {division.comment}
                </Typography>
                <Link to={`/tasks/${task?.parent_id}`}>参照リンク</Link>
              </CardContent>
            </Card>
          </Grid>
        ) : null}
        {childrenTasksCount ? (
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
                        sx={{ mr: 1 }}
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
                        sx={{ mr: 1 }}
                      >
                        To:
                      </Typography>
                      <Typography variant="body1" component="div">
                        {childTask.user.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="text.secondary"
                      >
                        コメント：
                      </Typography>
                      <Typography variant="body1" component="div">
                        {childTask.division.comment}
                      </Typography>
                    </Stack>
                    <Link to={`/tasks/${childTask.id}`}>参照リンク</Link>
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
