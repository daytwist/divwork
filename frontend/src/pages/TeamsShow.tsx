import { useState, useEffect, FC } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse, User } from "../types";

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

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            {team?.name ? `${team.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          {users?.map((user) => (
            <Grid item key={user.id}>
              <Button
                variant="text"
                size="large"
                component={Link}
                to={`/users/${user.id}`}
              >
                {user.name}
              </Button>
              {user.tasks_count[0]}
              {user.tasks_count[1]}
              {user.tasks_count[2]}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TeamsShow;
