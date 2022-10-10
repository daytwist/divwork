import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse } from "../types/teamTypes";
import { User } from "../types/userTypes";
import { AuthContext } from "../providers/AuthProvider";

export const useFetchTeam = () => {
  const { currentUser, teamReloadFlag } = useContext(AuthContext);
  const [team, setTeam] = useState<Team>();
  const [users, setUsers] = useState<User[]>();

  const options: AxiosRequestConfig = {
    url: `/teams/${currentUser?.team_id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    if (currentUser) {
      axiosInstance(options)
        .then((res: AxiosResponse<TeamsShowResponse>) => {
          console.log(res);
          setTeam(res.data.team);
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser, teamReloadFlag]);

  return { team, users };
};
