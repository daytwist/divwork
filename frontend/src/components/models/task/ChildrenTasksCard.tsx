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
import { ChildrenTask } from "../../../types";
import { TaskContentTypography } from "./TaskContentTypography";
import { PriorityLabel } from "./PriorityLabel";
import { DatetimeFormat } from "../../ui/DatetimeFormat";

type Props = {
  childrenTasks: ChildrenTask[];
};

export const ChildrenTasksCard = (props: Props) => {
  const { childrenTasks } = props;

  return (
    <Card sx={{ minWidth: 500, p: 2 }}>
      <CardHeader title="子タスク情報" />
      <CardContent>
        <Divider sx={{ mb: 2 }} />
        {childrenTasks?.map((childTask) => (
          <div key={childTask.id}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
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
              <Typography>{childTask.user.name}のタスク</Typography>
            </Stack>
            <Box mb={2}>
              <Typography
                variant="h6"
                component={Link}
                to={`/tasks/${childTask.id}`}
                sx={{ color: "inherit" }}
              >
                {childTask.title}
              </Typography>
            </Box>
            <TaskContentTypography
              subtitle="詳細"
              body={childTask.description}
            />
            <TaskContentTypography
              subtitle="優先度"
              body={PriorityLabel(childTask.priority)}
            />
            <TaskContentTypography
              subtitle="納期"
              body={DatetimeFormat(childTask.deadline)}
            />
            <TaskContentTypography
              subtitle="進捗率"
              body={`${childTask.rate_of_progress}%`}
            />
            <TaskContentTypography
              subtitle="ステータス"
              body={childTask.is_done ? "完了済み" : "未了"}
            />
            <Divider sx={{ my: 2 }} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
