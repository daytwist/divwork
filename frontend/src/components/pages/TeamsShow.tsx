import { useState, useEffect, FC } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar, Divider, Grid, Typography, Stack } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { Team, TeamsShowResponse, User } from "../../types";
import { TasksBarChart } from "../models/task/TasksBarChart";
import { TasksNewButton } from "../models/task/TasksNewButton";

const TeamsShow: FC = () => {
  const params = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team>();
  const [users, setUsers] = useState<User[]>();

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

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            data-testid="teams-show-h4"
          >
            {team?.name ? `${team.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          <TasksNewButton />
        </Grid>
        {users?.map((user) => (
          <Grid item key={user.id}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 120 },
                      mr: { xs: 1, sm: 2 },
                    }}
                  >
                    {user.avatar ? (
                      <Avatar
                        src={user.avatar}
                        alt="avatar"
                        sx={{
                          width: { sm: 60 },
                          height: { sm: 60 },
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: { sm: 60 },
                          height: { sm: 60 },
                        }}
                      />
                    )}
                    <Typography
                      variant="button"
                      sx={{
                        mt: { xs: 0, sm: 1 },
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item>
                <TasksBarChart user={user} maxCount={maxCount} />
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeamsShow;
