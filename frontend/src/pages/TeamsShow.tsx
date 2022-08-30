import { useState, useEffect, FC } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse, User } from "../types";
import { TasksBar } from "../components/TasksBar";

const TeamsShow: FC = () => {
  const [team, setTeam] = useState<Team>();
  const [users, setUsers] = useState<User[]>();

  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/teams/${params.id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TeamsShowResponse>) => {
        console.log(res);
        setTeam(res.data.team);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const totals: number[] = [];
  // eslint-disable-next-line array-callback-return
  users?.map((user) => {
    const total = user.unfinished_tasks_count.reduce(
      (sum: number, element: number) => {
        return sum + element;
      },
      0
    );
    totals.push(total);
  });
  const maxCount: number = Math.max(...totals);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="teams-show-h4">
            {team?.name ? `${team.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          {users?.map((user) => (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              key={user.id}
            >
              <Grid item>
                <Button
                  variant="text"
                  size="large"
                  component={Link}
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Button>
              </Grid>
              <Grid item>
                <TasksBar user={user} maxCount={maxCount} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TeamsShow;
