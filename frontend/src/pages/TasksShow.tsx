import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
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
          <Card sx={{ width: 700, p: 2 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                component="div"
                color="text.secondary"
              >
                タイトル
              </Typography>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                {task?.title}
              </Typography>
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
              {task?.user_id === currentUser?.id && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  component={Link}
                  to={`/tasks/${task?.id}/edit`}
                >
                  編集
                </Button>
              )}
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
