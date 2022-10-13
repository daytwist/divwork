import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { AuthResponse } from "../../types/userTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type Props = {
  name: string;
  email: string;
  password: string;
  teamId: number;
  isAdmin: boolean;
};

export const useSignUp = (props: Props) => {
  const { name, email, password, teamId, isAdmin } = props;
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "POST",
      params: {
        name,
        email,
        password,
        team_id: teamId,
        admin: isAdmin,
      },
    };

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
          message: "ユーザー登録しました",
        });
        navigate("/teams", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          message: `${err.response.data.errors.full_messages.join("。")}`,
        });
      });
  };

  return handleSignUp;
};
