import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { TeamsResponse, EditTeam } from "../../types/teamTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type Props = {
  team: EditTeam;
};

export const usePatchTeam = (props: Props) => {
  const { team } = props;
  const { currentUser, reloadTeamFlag, setReloadTeamFlag } =
    useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: `/teams/${currentUser?.team_id}`,
    method: "PATCH",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: team,
  };

  const handleUpdateTeam = () => {
    baseAxios(options)
      .then((res: AxiosResponse<TeamsResponse>) => {
        console.log(res);
        setReloadTeamFlag(!reloadTeamFlag);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "チーム情報を更新しました",
        });
        navigate("/teams", { replace: false });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.messages,
        });
      });
  };

  return handleUpdateTeam;
};
