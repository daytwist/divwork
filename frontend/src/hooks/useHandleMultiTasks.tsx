import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GridRowId } from "@mui/x-data-grid";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { TasksResponse } from "../types";

type Props = {
  selectionModel: GridRowId[];
  isFinished: boolean;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
};

export const useHandleMultiTasks = (props: Props) => {
  const { selectionModel, isFinished, flag, setFlag, handleClose } = props;
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleMultiIsDoneUpdate = () => {
    // eslint-disable-next-line array-callback-return
    selectionModel?.map((id) => {
      const options: AxiosRequestConfig = {
        url: `/tasks/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "access-token": Cookies.get("_access_token") || "",
          client: Cookies.get("_client") || "",
          uid: Cookies.get("_uid") || "",
        },
        data: { is_done: !isFinished },
      };

      axiosInstance(options)
        .then((res: AxiosResponse<TasksResponse>) => {
          console.log(res);
          setFlag(!flag);

          if (res.status === 200) {
            handleSetSnackbar({
              open: true,
              type: "success",
              message: isFinished
                ? "タスクを未了にしました"
                : "タスクを完了済みにしました",
            });
          }
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
  };

  const handleMultiTasksDelete = () => {
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

      axiosInstance(options)
        .then((res: AxiosResponse) => {
          console.log(res);
          setFlag(!flag);

          if (res.status === 200) {
            handleSetSnackbar({
              open: true,
              type: "success",
              message: "タスクを削除しました",
            });
            handleClose();
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
    });
  };

  return { handleMultiIsDoneUpdate, handleMultiTasksDelete };
};
