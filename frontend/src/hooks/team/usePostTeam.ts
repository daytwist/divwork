import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { TeamsResponse } from "../../types/teamTypes";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const usePostTeam = (name: string) => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/teams",
    method: "POST",
    data: { name },
  };

  const handleCreateTeam = () => {
    baseAxios(options)
      .then((res: AxiosResponse<TeamsResponse>) => {
        console.log(res);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "チームを作成しました",
        });
        navigate("/sign_up", {
          state: {
            teamId: res.data.team.id,
            teamName: res.data.team.name,
            isAdmin: true,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          message: `${err.response.data.messages.join("。")}`,
        });
      });
  };

  return handleCreateTeam;
};
