import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task } from "../types";
import { TasksTable } from "../components/TasksTable";

const UsersShow: FC = () => {
  const { user, tasks: tasksData } = useFetchUser();
  const { currentUser } = useContext(AuthContext);
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
        {user?.id === currentUser?.id && (
          <Grid item>
            <Button
              variant="contained"
              type="button"
              component={Link}
              to="/tasks/new"
            >
              新規作成
            </Button>
          </Grid>
        )}
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
