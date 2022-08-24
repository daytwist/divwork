import { FC, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task } from "../types";
import { TasksTable } from "../components/TasksTable";
import { TasksButtons } from "../components/TasksButtons";

const UsersShow: FC = () => {
  const { user, tasks: tasksData } = useFetchUser();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="users-show-h4">
            {user?.name ? `${user.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          <TasksButtons user={user} />
        </Grid>
        <Grid item>
          <TasksTable
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            isUnFinished
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShow;
