import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { taskApi } from "../../apis/task";
import { FetchTaskResponse } from "../../types/taskTypes";

export const useFetchTask = (
  action: string
): [FetchTaskResponse | undefined, boolean] => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState<FetchTaskResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return undefined;
    const abortCtrl = new AbortController();

    if (action === "edit") {
      taskApi
        .editTask<FetchTaskResponse>(taskId)
        .then((result) => {
          console.log(result);
          setTaskData(result);
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
          navigate("/teams", { replace: true });
          setIsLoading(false);
        });
    }

    if (action === "show") {
      taskApi
        .getTask<FetchTaskResponse>(taskId)
        .then((result) => {
          console.log(result);
          setTaskData(result);
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
          navigate("/teams", { replace: true });
          setIsLoading(false);
        });
    }

    return () => {
      abortCtrl.abort();
    };
  }, [taskId, action]);

  return [taskData, isLoading];
};
