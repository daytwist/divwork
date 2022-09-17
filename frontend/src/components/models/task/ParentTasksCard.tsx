import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
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
    <Card sx={{ minWidth: 500, p: 2 }}>
      <CardHeader title="親タスク情報" />
      <CardContent>
        <Divider sx={{ mb: 2 }} />
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
        <Box mb={2}>
          <Typography
            variant="h6"
            component={Link}
            to={`/tasks/${parentTask.id}`}
            sx={{ color: "inherit" }}
          >
            {parentTask.title}
          </Typography>
        </Box>
        {parentTask.description ? (
          <TaskContentTypography
            subtitle="詳細"
            body={parentTask.description}
          />
        ) : null}
        <PriorityStack value={parentTask.priority} />
        <TaskContentTypography
          subtitle="納期"
          body={DatetimeFormat(parentTask.deadline)}
        />
        <TaskContentTypography
          subtitle="進捗率"
          body={`${parentTask.rate_of_progress}%`}
        />
        <TaskContentTypography
          subtitle="ステータス"
          body={parentTask.is_done ? "完了済み" : "未了"}
        />
      </CardContent>
    </Card>
  );
};
