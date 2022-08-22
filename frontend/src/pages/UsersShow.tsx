import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";

const UsersShow: FC = () => {
  const { user, tasks } = useFetchUser();
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
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
          {tasks?.map((task) => (
            <Grid item key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShow;
