import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { UsersUpdateResponse } from "../../types/userTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type Props = {
  name: string;
  email: string;
  avatar: {
    data: string;
    filename: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePatchUser = (props: Props) => {
  const { name, email, avatar } = props;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/auth",
    method: "PATCH",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: { name, email, avatar },
  };

  const handleUpdateUser = () => {
    baseAxios(options)
      .then((res: AxiosResponse<UsersUpdateResponse>) => {
        console.log(res);
        setCurrentUser(res.data.data);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "ユーザー情報を更新しました",
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

  return handleUpdateUser;
};
