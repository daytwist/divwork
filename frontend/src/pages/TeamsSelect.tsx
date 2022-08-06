import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, MenuItem, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsSelectResponse } from "../types";

const TeamsSelect: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [value, setValue] = useState<string>("");

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
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        所属チームの選択
      </Typography>
      <Typography variant="subtitle1" component="div">
        選択したチームのユーザーを作成します。
      </Typography>
      <div>
        <TextField
          select
          label="チーム"
          sx={{ width: "25ch" }}
          name="team"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {teams?.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Link
        style={{ textDecoration: "none" }}
        to="/sign_up"
        key={value}
        state={{ selectTeam: value }}
      >
        次へ
      </Link>
    </Container>
  );
};

export default TeamsSelect;
