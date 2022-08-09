import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsSelectResponse } from "../types";

const TeamsSelect: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

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
    <Container maxWidth="sm">
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
          <Link
            style={{ textDecoration: "none" }}
            to="/sign_up"
            key={teamId}
            state={{ teamId, teamName }}
          >
            <Button variant="contained" type="button">
              次へ
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeamsSelect;
