import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { PatchPasswordResponse } from "../../types/userTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type Props = {
  values: {
    password: string;
    passwordConfirmation: string;
  };
};

export const usePatchPassword = (props: Props) => {
  const { values } = props;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/auth/password",
    method: "PATCH",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: {
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    },
  };

  const handleUpdatePassword = () => {
    baseAxios(options)
      .then((res: AxiosResponse<PatchPasswordResponse>) => {
        console.log(res);
        setCurrentUser(res.data.data);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "パスワードを更新しました",
        });
        navigate(`/users/${currentUser?.id}`, { replace: false });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.errors.full_messages.join("。"),
        });
      });
  };

  return handleUpdatePassword;
};
