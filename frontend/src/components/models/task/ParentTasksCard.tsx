import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { DivisionIncludeUserName, Task } from "../../../types";
import { TasksContentStack } from "./TasksContentStack";

type Props = {
  task: Task;
  division: DivisionIncludeUserName;
};

export const ParentTasksCard = (props: Props) => {
  const { task, division } = props;

  return (
    <Card sx={{ minWidth: 500, p: 2 }}>
      <CardHeader title="親タスク情報" />
      <CardContent>
        <Divider sx={{ mb: 2 }} />
        <TasksContentStack subtitle="From:" body={division.user.name} />
        {division.comment ? (
          <TasksContentStack subtitle="コメント:" body={division.comment} />
        ) : null}
        <Stack direction="row" alignItems="center">
          <Typography
            variant="subtitle1"
            component="div"
            color="text.secondary"
            sx={{ textAlign: "end", width: 85, mr: 1 }}
          >
            参照リンク:
          </Typography>
          <IconButton component={Link} to={`/tasks/${task?.parent_id}`}>
            <LinkIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};
