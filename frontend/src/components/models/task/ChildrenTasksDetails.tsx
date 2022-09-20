import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChildTask } from "../../../types";
import { TaskContentTypography } from "./TaskContentTypography";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { PriorityStack } from "./PriorityStack";
import { TaskCardAvatar } from "./TaskCardAvatar";

type Props = {
  childrenTasks: ChildTask[];
};

export const ChildrenTasksDetails = (props: Props) => {
  const { childrenTasks } = props;

  return (
    <Grid2 container rowSpacing={1}>
      {childrenTasks?.map((childTask) => (
        <div key={childTask.id}>
          <Grid2 xs={12}>
            <Typography color="text.secondary" variant="body2" component="div">
              {DatetimeFormat(childTask.division.created_at)}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TaskCardAvatar avatar={childTask.division_avatar} />
              <Typography>
                {childTask.division.user.name}が分担を作成しました。
              </Typography>
            </Stack>
          </Grid2>
          {childTask.division.comment ? (
            <Grid2 xs={12}>
              <Typography mt={1}>
                コメント：{childTask.division.comment}
              </Typography>
            </Grid2>
          ) : null}
          <Grid2 xs={12}>
            <Card sx={{ p: 2, mt: 2 }}>
              <CardHeader
                title={
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TaskCardAvatar avatar={childTask.avatar} />
                      <Typography variant="body1" component="div">
                        {childTask.user.name}のタスク
                      </Typography>
                    </Stack>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/tasks/${childTask.id}`}
                      sx={{ color: "inherit" }}
                    >
                      {childTask.title}
                    </Typography>
                  </Stack>
                }
              />
              <CardContent>
                <Grid2 container rowSpacing={2} p={0}>
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
              </CardContent>
            </Card>
          </Grid2>
          <Divider sx={{ my: 4 }} />
        </div>
      ))}
    </Grid2>
  );
};
