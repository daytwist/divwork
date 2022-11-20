import { useState, useEffect, useContext } from "react";
import { FetchTeamResponse } from "../../types/teamTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { teamApi } from "../../apis/team";

export const useFetchTeam = (): [
  FetchTeamResponse | undefined,
  boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any | undefined
] => {
  const { currentUser, reloadTeamFlag } = useContext(AuthContext);
  const [teamData, setTeamData] = useState<FetchTeamResponse>();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!currentUser?.team_id) return undefined;
    const abortCtrl = new AbortController();
    teamApi
      .getTeam<FetchTeamResponse>(currentUser.team_id)
      .then((result) => {
        console.log(result);
        setTeamData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });
    return () => {
      abortCtrl.abort();
    };
  }, [currentUser, reloadTeamFlag]);

  return [teamData, isLoading, error];
};
