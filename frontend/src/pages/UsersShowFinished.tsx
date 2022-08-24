import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Task, User, UsersResponse } from "../types";
import { TasksTable } from "../components/TasksTable";
import { TasksButtons } from "../components/TasksButtons";

const UsersShowFinished: FC = () => {
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
        <Grid item>
          <TasksButtons user={user} />
        </Grid>
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
