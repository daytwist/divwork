import { useState, useEffect, FC, useContext } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse, User } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const TeamsShow: FC = () => {
  const [team, setTeam] = useState<Team>();
  const [users, setUsers] = useState<User[]>();

  const params = useParams<{ id: string }>();
  const { isSignedIn } = useContext(AuthContext);

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
      {isSignedIn || <Navigate to="/sign_in" />}
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
