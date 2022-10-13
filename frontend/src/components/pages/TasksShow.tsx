import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFetchTask } from "../../hooks/useFetchTask";
import { Task } from "../../types/taskTypes";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { UserNameHeader } from "../models/user/UserNameHeader";
import { ChildrenTasksDetails } from "../models/task/ChildrenTasksDetails";
import { ParentTaskDetails } from "../models/task/ParentTaskDetails";
import { TaskCard } from "../models/task/TaskCard";
import { BackIconButton } from "../ui/BackIconButton";

export const TasksShow = () => {
  const [taskData, isLoading] = useFetchTask("show");
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (taskData?.task) {
      setTask(taskData.task);
      window.scrollTo(0, 0);
    }
  }, [taskData?.task]);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  return (
    <div>
      <Grid2
        container
        direction="column"
        spacing={3}
        alignContent="center"
        sx={{ width: { xs: 350, sm: 530, md: 780, lg: 800, xl: 1000 } }}
      >
        <Grid2 xs={12}>
          <Stack direction="row" spacing={1} alignItems="center">
            <BackIconButton />
            <UserNameHeader user={taskData?.user} />
          </Stack>
        </Grid2>
        <Grid2 xs={12}>
          <TaskCard
            task={task}
            setTask={setTask}
            childrenTasks={taskData?.children_tasks}
            division={taskData?.division}
          />
        </Grid2>
        <Grid2 xs={12}>
          {taskData?.division && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                data-testid="parent-task-details"
              >
                親タスク情報
              </AccordionSummary>
              <AccordionDetails>
                {taskData?.parent_task ? (
                  <ParentTaskDetails
                    division={taskData?.division}
                    parentTask={taskData?.parent_task}
                  />
                ) : (
                  <Stack direction="column" spacing={1}>
                    <Typography variant="body1" component="div">
                      親タスクは削除されました。
                    </Typography>
                    <Typography variant="body1" component="div">
                      分担作成者：
                      {taskData?.division.user_id ? (
                        <Link
                          variant="body1"
                          color="inherit"
                          underline="hover"
                          component={RouterLink}
                          to={`/users/${taskData?.division.user_id}`}
                        >
                          {taskData?.division.user.name}
                        </Link>
                      ) : (
                        "不明なユーザー"
                      )}
                    </Typography>
                  </Stack>
                )}
              </AccordionDetails>
            </Accordion>
          )}
          {taskData?.children_tasks?.length ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                data-testid="children-tasks-details"
              >
                子タスク情報
              </AccordionSummary>
              <AccordionDetails>
                <ChildrenTasksDetails
                  childrenTasks={taskData?.children_tasks}
                />
              </AccordionDetails>
            </Accordion>
          ) : null}
        </Grid2>
      </Grid2>
    </div>
  );
};
