import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Team, TeamsShowResponse, User } from "../types";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const useFetchTeam = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team>();
  const [users, setUsers] = useState<User[]>();

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
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: `${err.response.data.messages}`,
        });
        navigate(`/teams/${currentUser?.team_id}`, { replace: true });
      });
  }, [params]);

  return { team, users };
};
