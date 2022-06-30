import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse, User } from "../types";

const TeamsShow: React.FC = () => {
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
      <h1>Teams#Show</h1>
      <h2>{team?.name}</h2>
      <div>
        <ul>
          {users?.map((user) => (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
                <li>{user.name}</li>
              </Link>
              {user.tasks_count[0]}
              {user.tasks_count[1]}
              {user.tasks_count[2]}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsShow;
