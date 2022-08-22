import { useState, useEffect, FC, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { User, Task, UsersShowResponse } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const UsersShow: FC = () => {
  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const { currentUser } = useContext(AuthContext);
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/users/${params.id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<UsersShowResponse>) => {
        console.log(res);
        setUser(res.data.user);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="sm">
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
    </Container>
  );
};

export default UsersShow;
