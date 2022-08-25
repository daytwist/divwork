import { useContext, FC, useEffect, useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task } from "../types";
import { TasksTable } from "../components/TasksTable";

const UsersShow: FC = () => {
  const { user, unfinishedTasks, finishedTasks } = useFetchUser();
  const { currentUser } = useContext(AuthContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [value, setValue] = useState("unfinished");

  const handleSwitchTasks = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);

    if (newValue === "finished") {
      setIsFinished(true);
      setTasks(finishedTasks);
      console.log(isFinished);
    } else {
      setIsFinished(false);
      setTasks(unfinishedTasks);
      console.log(isFinished);
    }
  };

  useEffect(() => {
    if (isFinished) {
      setTasks(finishedTasks);
    } else {
      setTasks(unfinishedTasks);
    }
  }, [unfinishedTasks, finishedTasks]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="users-show-h4">
            {user?.name ? `${user.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {user?.id === currentUser?.id ? (
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
            ) : (
              <br />
            )}
            <Grid item>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleSwitchTasks}
                  aria-label="tabs"
                >
                  <Tab value="unfinished" label="未了" />
                  <Tab value="finished" label="完了済み" />
                </Tabs>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TasksTable
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            isFinished={isFinished}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShow;
