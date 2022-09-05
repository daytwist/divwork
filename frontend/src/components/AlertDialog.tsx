import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const AlertDialog = (props: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { open, handleClose } = props;

  const handleTasksDelete = () => {
    const options: AxiosRequestConfig = {
      url: `/tasks/${params.id}`,
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: `${err.response.data.errors}`,
        });
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">タスクを削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          削除したタスクは元に戻せません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleTasksDelete}>
          削除する
        </Button>
        <Button color="secondary" onClick={handleClose} autoFocus>
          戻る
        </Button>
      </DialogActions>
    </Dialog>
  );
};
