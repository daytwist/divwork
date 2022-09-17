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
  parentTask: TaskIncludeUser;
};

export const ParentTasksCard = (props: Props) => {
  const { parentTask } = props;

  return (
    <Card sx={{ width: 550, p: 2 }}>
      <CardHeader title="親タスク情報" />
      <CardContent>
        <Divider sx={{ mb: 2 }} />
        <Grid2 container rowSpacing={2}>
          <Grid2 xs={12}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              {parentTask.avatar ? (
                <Avatar
                  src={parentTask.avatar}
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
                {parentTask.user.name}のタスク
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 xs={12}>
            <Typography
              variant="h6"
              component={Link}
              to={`/tasks/${parentTask.id}`}
              sx={{ color: "inherit" }}
            >
              {parentTask.title}
            </Typography>
          </Grid2>
          {parentTask.description ? (
            <Grid2 xs={12}>
              <TaskContentTypography
                subtitle="詳細"
                body={parentTask.description}
              />
            </Grid2>
          ) : null}
          <Grid2 xs={6}>
            <PriorityStack value={parentTask.priority} />
          </Grid2>
          <Grid2 xs={6}>
            <TaskContentTypography
              subtitle="納期"
              body={DatetimeFormat(parentTask.deadline)}
            />
          </Grid2>
          <Grid2 xs={6}>
            <TaskContentTypography
              subtitle="ステータス"
              body={parentTask.is_done ? "完了済み" : "未了"}
            />
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
  );
};
