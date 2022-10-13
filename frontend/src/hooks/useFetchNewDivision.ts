import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchNewDivisionResponse } from "../types/divisionTypes";
import { divisionApi } from "../apis/division";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const useFetchNewDivision = (): [
  FetchNewDivisionResponse | undefined,
  boolean
] => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const [divisionData, setDivisionData] = useState<FetchNewDivisionResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return undefined;
    const abortCtrl = new AbortController();
    divisionApi
      .getNewDivision<FetchNewDivisionResponse>(taskId)
      .then((result) => {
        console.log(result);
        setDivisionData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: "情報取得に失敗しました",
        });
        navigate(`/tasks/${taskId}`, { replace: true });
        setIsLoading(false);
      });
    return () => {
      abortCtrl.abort();
    };
  }, [taskId]);

  return [divisionData, isLoading];
};
