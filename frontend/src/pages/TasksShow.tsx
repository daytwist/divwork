import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useFetchTask } from "../hooks/useFetchTask";
import { AuthContext } from "../providers/AuthProvider";
import { PriorityLabel } from "../components/PriorityLabel";
import { DeadlineFormat } from "../components/DeadlineFormat";

const TasksShow: FC = () => {
  const task = useFetchTask();
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4" component="div">
            タスク詳細
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            タイトル
          </Typography>
          <Typography variant="h6" component="div">
            {task?.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            詳細
          </Typography>
          <Typography variant="body1" component="div">
            {task?.description}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            納期
          </Typography>
          <Typography variant="body1" component="div">
            {DeadlineFormat(task?.deadline)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            優先度
          </Typography>
          <Typography variant="body1" component="div">
            {PriorityLabel(task?.priority)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            完了フラグ
          </Typography>
          <Typography variant="body1" component="div">
            {task?.is_done.toString()}
          </Typography>
        </Grid>
        {task?.user_id === currentUser?.id && (
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              component={Link}
              to={`/tasks/${task?.id}/edit`}
            >
              編集
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            variant="contained"
            type="button"
            component={Link}
            to={`/tasks/${task?.id}/divisions/new`}
          >
            分担する
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksShow;
