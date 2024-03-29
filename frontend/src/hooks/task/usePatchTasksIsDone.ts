import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import Cookies from "js-cookie";
import { GridRowId } from "@mui/x-data-grid";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { TaskResponse } from "../../types/taskTypes";

type Props = {
  selectionModel: GridRowId[];
  isFinished: boolean;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
};

export const usePatchTasksIsDone = (props: Props) => {
  const { selectionModel, isFinished, flag, setFlag } = props;
  const { reloadTeamFlag, setReloadTeamFlag } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);

  const handleUpdateTasksIsDone = useCallback(() => {
    // eslint-disable-next-line array-callback-return
    selectionModel?.map((id) => {
      const options: AxiosRequestConfig = {
        url: `/tasks/${id}`,
        method: "PATCH",
        headers: {
          "access-token": Cookies.get("_access_token") || "",
          client: Cookies.get("_client") || "",
          uid: Cookies.get("_uid") || "",
        },
        data: !isFinished
          ? {
              is_done: !isFinished,
              rate_of_progress: 100,
            }
          : {
              is_done: !isFinished,
              rate_of_progress: 0,
            },
      };

      baseAxios(options)
        .then((res: AxiosResponse<TaskResponse>) => {
          console.log(res);
          setFlag(!flag);
          setReloadTeamFlag(!reloadTeamFlag);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: isFinished
              ? "タスクを未了にしました"
              : "タスクを完了済みにしました",
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
    });
  }, [selectionModel, isFinished, flag, reloadTeamFlag]);

  return handleUpdateTasksIsDone;
};
