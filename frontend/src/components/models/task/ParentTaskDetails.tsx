import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ParentTask } from "../../../types/taskTypes";
import { DivisionIncludeUserAvatar } from "../../../types/divisionTypes";
import { TaskContentTypography } from "./TaskContentTypography";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { PriorityStack } from "./PriorityStack";
import { TaskCardAvatar } from "./TaskCardAvatar";
import { DeadlineTypography } from "./DeadlineTypography";
import { IsDoneTypography } from "./IsDoneTypography";

type Props = {
  division: DivisionIncludeUserAvatar;
  parentTask: ParentTask;
};

export const ParentTaskDetails = (props: Props) => {
  const { division, parentTask } = props;

  return (
    <Grid2
      container
      direction="column"
      rowSpacing={1}
      pt={0}
      sx={{ px: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}
    >
      <Grid2 xs={12}>
        <Typography color="text.secondary" variant="body2" component="div">
          {DatetimeFormat(division.created_at)}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" alignItems="center">
          <TaskCardAvatar userId={division.user_id} avatar={division.avatar} />
          <Link
            variant="body1"
            color="inherit"
            underline="hover"
            component={RouterLink}
            to={`/users/${division.user_id}`}
            data-testid="division-user-name"
          >
            {division.user.name}
          </Link>
          <Typography variant="body1" component="div">
            から分担されました。
          </Typography>
        </Stack>
      </Grid2>
      {division.comment && (
        <Grid2 xs={12}>
          <Typography variant="body1" component="div">
            コメント：{division.comment}
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
                    userId={parentTask.user_id}
                    avatar={parentTask.avatar}
                  />
                  <Link
                    variant="body1"
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                    to={`/users/${parentTask.user_id}`}
                    data-testid="parent-task-user-name"
                  >
                    {parentTask.user.name}
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
                  to={`/tasks/${parentTask.id}`}
                >
                  {parentTask.title}
                </Link>
              </Stack>
            }
          />
          <CardContent sx={{ p: 1 }}>
            <Grid2 container rowSpacing={2} p={0}>
              {parentTask.description && (
                <Grid2 xs={12}>
                  <TaskContentTypography
                    subtitle="詳細"
                    body={parentTask.description}
                  />
                </Grid2>
              )}
              <Grid2 xs={6}>
                <PriorityStack value={parentTask.priority} />
              </Grid2>
              <Grid2 xs={6}>
                <DeadlineTypography deadline={parentTask.deadline} />
              </Grid2>
              <Grid2 xs={6}>
                <IsDoneTypography isDone={parentTask.is_done} />
              </Grid2>
              <Grid2 xs={6}>
                <TaskContentTypography
                  subtitle="進捗率"
                  body={`${parentTask.rate_of_progress}%`}
                />
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};
