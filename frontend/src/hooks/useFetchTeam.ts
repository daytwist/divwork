import { useState, useEffect, useContext } from "react";
import { TeamsShowResponse } from "../types/teamTypes";
import { AuthContext } from "../providers/AuthProvider";
import { teamApi } from "../apis/team";

export const useFetchTeam = (): [
  TeamsShowResponse | undefined,
  boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any | undefined
] => {
  const { currentUser, teamReloadFlag } = useContext(AuthContext);
  const [teamData, setTeamData] = useState<TeamsShowResponse>();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!currentUser?.team_id) return undefined;
    const abortCtrl = new AbortController();
    teamApi
      .getTeam<TeamsShowResponse>(currentUser.team_id)
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
  }, [currentUser, teamReloadFlag]);

  return [teamData, isLoading, error];
};
