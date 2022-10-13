import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { AuthResponse } from "../../types/userTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const useSignIn = (email: string, password: string) => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/auth/sign_in",
    method: "POST",
    params: {
      email,
      password,
    },
  };

  const handleSignIn = () => {
    baseAxios(options)
      .then((res: AxiosResponse<AuthResponse>) => {
        console.log(res);
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);
        setIsSignedIn(true);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "ログインしました",
        });
        navigate("/teams", { replace: true });
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

  return handleSignIn;
};
