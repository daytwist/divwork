import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import Cookies from "js-cookie";
import { GridRowId } from "@mui/x-data-grid";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type Props = {
  selectionModel: GridRowId[];
  isFinished: boolean;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
};

export const useDeleteTasks = (props: Props) => {
  const { selectionModel, isFinished, flag, setFlag, handleClose } = props;
  const { teamReloadFlag, setTeamReloadFlag } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);

  const handleMultiTasksDelete = useCallback(() => {
    // eslint-disable-next-line array-callback-return
    selectionModel?.map((id) => {
      const options: AxiosRequestConfig = {
        url: `/tasks/${id}`,
        method: "DELETE",
        headers: {
          "access-token": Cookies.get("_access_token") || "",
          client: Cookies.get("_client") || "",
          uid: Cookies.get("_uid") || "",
        },
      };

      baseAxios(options)
        .then((res: AxiosResponse) => {
          console.log(res);
          setFlag(!flag);
          setTeamReloadFlag(!teamReloadFlag);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "タスクを削除しました",
          });
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          handleSetSnackbar({
            open: true,
            type: "error",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            message: err.response.data.errors,
          });
        });
    });
  }, [selectionModel, isFinished, flag, teamReloadFlag]);

  return handleMultiTasksDelete;
};
