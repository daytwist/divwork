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
  const {
    task: taskData,
    user,
    parentTask,
    childrenTasks,
    division,
  } = useFetchTask({ action: "show" });

  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (taskData) {
      setTask(taskData);
      window.scrollTo(0, 0);
    }
  }, [taskData]);

  return (
    <div>
      {task ? (
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
                <UserNameHeader user={user} />
              </Stack>
            </Grid2>
            <Grid2 xs={12}>
              <TaskCard
                task={task}
                setTask={setTask}
                childrenTasks={childrenTasks}
                division={division}
              />
            </Grid2>
            <Grid2 xs={12}>
              {division && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    data-testid="parent-task-details"
                  >
                    親タスク情報
                  </AccordionSummary>
                  <AccordionDetails>
                    {parentTask ? (
                      <ParentTaskDetails
                        division={division}
                        parentTask={parentTask}
                      />
                    ) : (
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1" component="div">
                          親タスクは削除されました。
                        </Typography>
                        <Typography variant="body1" component="div">
                          分担作成者：
                          {division.user_id ? (
                            <Link
                              variant="body1"
                              color="inherit"
                              underline="hover"
                              component={RouterLink}
                              to={`/users/${division.user_id}`}
                            >
                              {division.user.name}
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
              {childrenTasks.length ? (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    data-testid="children-tasks-details"
                  >
                    子タスク情報
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChildrenTasksDetails childrenTasks={childrenTasks} />
                  </AccordionDetails>
                </Accordion>
              ) : null}
            </Grid2>
          </Grid2>
        </div>
      ) : (
        <LoadingColorRing />
      )}
    </div>
  );
};
