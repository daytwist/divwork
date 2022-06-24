import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Team, TeamsSelectResponse } from "../types";
import { axiosInstance } from "../utils/axios";

const TeamsSelect: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const options: AxiosRequestConfig = {
    url: "/teams/select",
    method: "GET",
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TeamsSelectResponse>) => {
        const { data } = res;
        console.log(data);
        setTeams(data.teams);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1>Teams#Select</h1>
      <div>
        <ul>
          {teams?.map((team) => (
            <Link to="/sign_up" key={team.id}>
              <li>{team.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsSelect;
