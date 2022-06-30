import { AxiosRequestConfig, AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Team, TeamsSelectResponse } from "../types";
import { axiosInstance } from "../utils/axios";

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
    <div>
      <h1>Teams#Select</h1>
      <div>
        <ul>
          {teams?.map((team) => (
            <Link to="/sign_up" key={team.id} state={{ selectTeam: team }}>
              <li>{team.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsSelect;
