import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const useDeleteUser = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/auth",
    method: "DELETE",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  const handleDeleteUser = () => {
    baseAxios(options)
      .then((res: AxiosResponse) => {
        console.log(res);
        setIsSignedIn(false);
        handleSetSnackbar({
          open: true,
          type: "success",
          message:
            "アカウントを削除しました。またのご利用をお待ちしております。",
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.error,
        });
      });
  };

  return handleDeleteUser;
};
