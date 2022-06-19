import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamResponse } from "../interfaces";

const TeamsShow: React.FC = () => {
  const [team, setTeam] = useState<Team>();
  const params = useParams();

  useEffect(() => {
    axiosInstance
      .get("/teams/1")
      .then((res: AxiosResponse<TeamResponse>) => {
        const { data } = res;
        console.log(data.team);
        setTeam(data.team);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div>
      <h1>Teams Show</h1>
      <h2>{params.id}</h2>
      <h2>{team?.name}</h2>
    </div>
  );
};

export default TeamsShow;
