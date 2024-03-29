import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TeamsResponse } from "../../types/teamTypes";
import { teamApi } from "../../apis/team";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const useFetchTeams = (): [TeamsResponse | undefined, boolean] => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [teamsData, setTeamsData] = useState<TeamsResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortCtrl = new AbortController();
    teamApi
      .getTeams<TeamsResponse>()
      .then((result) => {
        console.log(result);
        setTeamsData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: "情報取得出来ませんでした",
        });
        navigate("/", { replace: true });
        setIsLoading(false);
      });
    return () => {
      abortCtrl.abort();
    };
  }, []);

  return [teamsData, isLoading];
};
