import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { Team, TeamsSelectResponse } from "../../types";
import { BackButton } from "../ui/BackButton";

const TeamsSelect: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");

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

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div" gutterBottom>
          所属チームの選択
        </Typography>
        <Typography variant="body1" component="div">
          選択したチームでユーザー登録します。
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          select
          required
          label="チーム"
          color="secondary"
          sx={{ width: "30ch" }}
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
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            component={Link}
            to="/sign_up"
            key={teamId}
            state={{ teamId, teamName, isAdmin: false }}
          >
            次へ
          </Button>
          <BackButton />
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="body1" component="div">
          または
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/sign_up/teams/new"
        >
          新規チーム作成
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TeamsSelect;
