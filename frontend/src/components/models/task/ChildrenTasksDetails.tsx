import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChildTask } from "../../../types/taskTypes";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { TaskCardAvatar } from "./TaskCardAvatar";
import { TaskCardContent } from "./TaskCardContent";

type Props = {
  childrenTasks: ChildTask[];
};

export const ChildrenTasksDetails = (props: Props) => {
  const { childrenTasks } = props;

  return (
    <Grid2
      container
      direction="column"
      rowSpacing={1}
      pt={0}
      sx={{ px: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}
    >
      {childrenTasks?.map((childTask) => (
        <div key={childTask.id}>
          <Grid2 xs={12}>
            <Typography color="text.secondary" variant="body2" component="div">
              {DatetimeFormat(childTask.division.created_at)}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Stack direction="row" alignItems="center">
              <TaskCardAvatar
                userId={childTask.division.user_id}
                avatar={childTask.division_avatar}
              />
              <Link
                variant="body1"
                color="inherit"
                underline="hover"
                component={RouterLink}
                to={`/users/${childTask.division.user_id}`}
              >
                {childTask.division.user.name}
              </Link>
              <Typography variant="body1" component="div">
                が分担を作成しました。
              </Typography>
            </Stack>
          </Grid2>
          {childTask.division.comment && (
            <Grid2 xs={12}>
              <Typography variant="body1" component="div">
                コメント：{childTask.division.comment}
              </Typography>
            </Grid2>
          )}
          <Grid2 xs={12}>
            <Card sx={{ p: { xs: 1, sm: 2 }, mt: { xs: 1, sm: 2 } }}>
              <CardHeader
                sx={{ p: 1 }}
                title={
                  <Stack direction="column" spacing={2}>
                    <Stack direction="row" alignItems="center">
                      <TaskCardAvatar
                        userId={childTask.user_id}
                        avatar={childTask.avatar}
                      />
                      <Link
                        variant="body1"
                        color="inherit"
                        underline="hover"
                        component={RouterLink}
                        to={`/users/${childTask.user_id}`}
                      >
                        {childTask.user.name}
                      </Link>
                      <Typography variant="body1" component="div">
                        のタスク
                      </Typography>
                    </Stack>
                    <Link
                      variant="h6"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                      to={`/tasks/${childTask.id}`}
                    >
                      {childTask.title}
                    </Link>
                  </Stack>
                }
              />
              <CardContent sx={{ p: 1 }}>
                <TaskCardContent task={childTask} />
              </CardContent>
            </Card>
          </Grid2>
          <Divider sx={{ my: { xs: 2, sm: 4 } }} />
        </div>
      ))}
    </Grid2>
  );
};
