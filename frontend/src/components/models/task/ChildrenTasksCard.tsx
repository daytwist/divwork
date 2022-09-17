import { Link } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TaskIncludeUser } from "../../../types";
import { TaskContentTypography } from "./TaskContentTypography";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { PriorityStack } from "./PriorityStack";

type Props = {
  childrenTasks: TaskIncludeUser[];
};

export const ChildrenTasksCard = (props: Props) => {
  const { childrenTasks } = props;

  return (
    <Card sx={{ width: 550, p: 2 }}>
      <CardHeader title="子タスク情報" />
      <CardContent>
        <Divider sx={{ mb: 2 }} />
        {childrenTasks?.map((childTask) => (
          <div key={childTask.id}>
            <Grid2 container rowSpacing={2}>
              <Grid2 xs={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {childTask.avatar ? (
                    <Avatar
                      src={childTask.avatar}
                      alt="avatar"
                      sx={{
                        width: { sm: 30 },
                        height: { sm: 30 },
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: { sm: 30 },
                        height: { sm: 30 },
                      }}
                    />
                  )}
                  <Typography variant="body1" component="div">
                    {childTask.user.name}のタスク
                  </Typography>
                </Stack>
              </Grid2>
              <Grid2 xs={12}>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/tasks/${childTask.id}`}
                  sx={{ color: "inherit" }}
                >
                  {childTask.title}
                </Typography>
              </Grid2>
              {childTask.description ? (
                <Grid2 xs={12}>
                  <TaskContentTypography
                    subtitle="詳細"
                    body={childTask.description}
                  />
                </Grid2>
              ) : null}
              <Grid2 xs={6}>
                <PriorityStack value={childTask.priority} />
              </Grid2>
              <Grid2 xs={6}>
                <TaskContentTypography
                  subtitle="納期"
                  body={DatetimeFormat(childTask.deadline)}
                />
              </Grid2>
              <Grid2 xs={6}>
                <TaskContentTypography
                  subtitle="ステータス"
                  body={childTask.is_done ? "完了済み" : "未了"}
                />
              </Grid2>
              <Grid2 xs={6}>
                <TaskContentTypography
                  subtitle="進捗率"
                  body={`${childTask.rate_of_progress}%`}
                />
              </Grid2>
            </Grid2>
            <Divider sx={{ my: 2 }} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
