import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GridRowId } from "@mui/x-data-grid";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

type Props = {
  taskId: string | GridRowId | undefined;
};

export const useTasksDelete = (props: Props) => {
  const { taskId } = props;
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: `/tasks/${taskId}`,
    method: "DELETE",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  const handleTasksDelete = useCallback(() => {
    axiosInstance(options)
      .then((res: AxiosResponse) => {
        console.log(res);

        if (res.status === 200) {
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "タスクを削除しました",
          });
          navigate(`/users/${currentUser?.id}`, { replace: true });
        }
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
  }, []);

  return handleTasksDelete;
};
