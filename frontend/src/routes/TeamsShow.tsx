import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse } from "../interfaces";

const TeamsShow: React.FC = () => {
  const [team, setTeam] = useState<Team>();
  const params = useParams<{ id: string }>();
  const options: AxiosRequestConfig = {
    url: `/teams/${params.id}`,
    method: "GET",
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TeamsShowResponse>) => {
        const { data } = res;
        console.log(data);
        console.log(params);
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
