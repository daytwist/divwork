import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsSelectResponse } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const TeamsSelect: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

  const { isSignedIn, currentUser } = useContext(AuthContext);

  const options: AxiosRequestConfig = {
    url: "/teams/select",
    method: "GET",
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TeamsSelectResponse>) => {
        console.log(res);
        setTeams(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamId(value);

    const teamIdNumber = Number(value);
    const selectTeam: Team | undefined = teams.find(
      (v) => v.id === teamIdNumber
    );
    console.log(selectTeam);

    if (selectTeam) {
      setTeamName(selectTeam.name);
    }
  };

  return (
    <div>
      {isSignedIn && <Navigate to={`/teams/${currentUser?.team_id}`} />}
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            所属チームの選択
          </Typography>
          <Typography variant="subtitle1" component="div">
            選択したチームのユーザーを作成します。
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="チーム"
            sx={{ width: "25ch" }}
            name="id"
            value={teamId}
            defaultValue=""
            onChange={handleChange}
          >
            {teams?.map((menu) => (
              <MenuItem key={menu.id} value={menu.id}>
                {menu.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button variant="contained" type="button">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/sign_up"
              key={teamId}
              state={{ teamId, teamName }}
            >
              次へ
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ my: 2, ml: 13 }}
          >
            または
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            新規チーム作成
          </Typography>
          <Typography variant="subtitle1" component="div">
            ユーザーはこのチームの管理者となります。
          </Typography>
        </Grid>
        <Grid item>
          <TextField type="text" label="新規チーム名" sx={{ width: "25ch" }} />
        </Grid>
        <Grid item>
          <Button variant="contained" type="button">
            作成
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeamsSelect;
