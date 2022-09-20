import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DivisionIncludeUserAvatar, ParentTask } from "../../../types";
import { TaskContentTypography } from "./TaskContentTypography";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { PriorityStack } from "./PriorityStack";
import { TaskCardAvatar } from "./TaskCardAvatar";

type Props = {
  division: DivisionIncludeUserAvatar;
  parentTask: ParentTask;
};

export const ParentTaskDetails = (props: Props) => {
  const { division, parentTask } = props;

  return (
    <Grid2 container rowSpacing={1}>
      <Grid2 xs={12}>
        <Typography color="text.secondary" variant="body2" component="div">
          {DatetimeFormat(division.created_at)}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TaskCardAvatar avatar={division.avatar} />
          <Typography>{division.user.name}から分担されました。</Typography>
        </Stack>
      </Grid2>
      {division.comment ? (
        <Grid2 xs={12}>
          <Typography>コメント：{division.comment}</Typography>
        </Grid2>
      ) : null}
      <Grid2 xs={12}>
        <Card sx={{ p: 2, mt: 2 }}>
          <CardHeader
            title={
              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TaskCardAvatar avatar={parentTask.avatar} />
                  <Typography variant="body1" component="div">
                    {parentTask.user.name}のタスク
                  </Typography>
                </Stack>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/tasks/${parentTask.id}`}
                  sx={{ color: "inherit" }}
                >
                  {parentTask.title}
                </Typography>
              </Stack>
            }
          />
          <CardContent>
            <Grid2 container rowSpacing={2} p={0}>
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
      </Grid2>
    </Grid2>
  );
};
