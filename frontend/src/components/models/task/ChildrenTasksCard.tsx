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
import { ChildrenTask } from "../../../types";
import { TasksContentStack } from "./TasksContentStack";

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
            <TasksContentStack
              subtitle="From:"
              body={childTask.division.user.name}
            />
            <TasksContentStack subtitle="To:" body={childTask.user.name} />
            {childTask.division.comment ? (
              <TasksContentStack
                subtitle="コメント:"
                body={childTask.division.comment}
              />
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
              <IconButton component={Link} to={`/tasks/${childTask.id}`}>
                <LinkIcon />
              </IconButton>
            </Stack>
            <Divider sx={{ my: 2 }} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
