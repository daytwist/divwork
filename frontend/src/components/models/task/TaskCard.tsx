import { Dispatch, useContext, SetStateAction } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  Stack,
  IconButton,
  CardContent,
  CardActions,
  Tooltip,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { TasksDeleteIconButton } from "./TasksDeleteIconButton";
import { UpdateIsDoneButton } from "./UpdateIsDoneButton";
import { AuthContext } from "../../../providers/AuthProvider";
import { Task, ChildTask } from "../../../types/taskTypes";
import { DivisionIncludeUserAvatar } from "../../../types/divisionTypes";
import { usePatchTaskIsDone } from "../../../hooks/task/usePatchTaskIsDone";
import { NewDivisionButton } from "./NewDivisionButton";
import { TaskCardContent } from "./TaskCardContent";

type Props = {
  task: Task | undefined;
  setTask: Dispatch<SetStateAction<Task | undefined>>;
  childrenTasks: ChildTask[] | undefined;
  division: DivisionIncludeUserAvatar | undefined;
};

export const TaskCard = (props: Props) => {
  const { task, setTask, childrenTasks, division } = props;
  const { currentUser } = useContext(AuthContext);
  const { id: taskId } = useParams();
  const handleUpdateTaskIsDone = usePatchTaskIsDone({ task, setTask });

  return (
    <Card sx={{ p: { xs: 1, sm: 2 } }}>
      <CardHeader
        title={
          <Typography variant="h5" component="div">
            {task?.title}
          </Typography>
        }
        subheader={
          <Grid2 container direction="column" spacing={1} p={0} mt={1}>
            <Grid2 xs={12}>
              <Typography
                color="text.secondary"
                variant="body2"
                component="div"
              >
                登録日：{DatetimeFormat(task?.created_at)}
              </Typography>
            </Grid2>
            {division && (
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
            )}
            {childrenTasks?.length ? (
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
                <IconButton component={Link} to={`/tasks/${task?.id}/edit`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <TasksDeleteIconButton taskId={taskId} />
            </Stack>
          )
        }
      />
      <CardContent sx={{ p: 2 }}>
        <TaskCardContent task={task} />
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          {task?.user_id === currentUser?.id && (
            <UpdateIsDoneButton
              onClick={handleUpdateTaskIsDone}
              disabled={false}
              isFinished={task?.is_done}
            />
          )}
          {task?.is_done ? null : <NewDivisionButton task={task} />}
        </Stack>
      </CardActions>
    </Card>
  );
};
