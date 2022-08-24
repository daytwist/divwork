import { FC, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { Task, User, UsersResponse } from "../types";
import { TasksTable } from "../components/TasksTable";

const UsersShowFinished: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams<{ id: string }>();

  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const options: AxiosRequestConfig = {
    url: `/users/${params.id}/finished`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<UsersResponse>) => {
        console.log(res);
        setUser(res?.data.user);
        setTasks(res?.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="users-show-h4">
            {user?.name ? `${user.name}の完了タスク` : ""}
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
            isUnFinished={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShowFinished;
