import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchTask } from "../hooks/useFetchTask";
import { AuthContext } from "../providers/AuthProvider";
import { PriorityLabel } from "../components/PriorityLabel";
import { DeadlineFormat } from "../components/DeadlineFormat";

const TasksShow: FC = () => {
  const task = useFetchTask();
  const { currentUser } = useContext(AuthContext);

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
              title={task?.title}
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
                    <Tooltip title="削除" placement="top" arrow>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
              <Button
                variant="contained"
                type="button"
                component={Link}
                to={`/tasks/${task?.id}/divisions/new`}
              >
                分担する
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksShow;
