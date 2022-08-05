import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsSelectResponse } from "../types";

const TeamsSelect: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

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
        <ul>
          {teams?.map((team) => (
            <Link
              style={{ textDecoration: "none" }}
              to="/sign_up"
              key={team.id}
              state={{ selectTeam: team }}
            >
              <li>{team.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TeamsSelect;
