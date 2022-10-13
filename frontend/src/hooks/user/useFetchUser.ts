import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../apis/user";
import { UsersResponse } from "../../types/userTypes";
import { SnackbarContext } from "../../providers/SnackbarProvider";

export const useFetchUser = (
  reloadFlag: boolean | undefined,
  action: string
): [UsersResponse | undefined, boolean] => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UsersResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return undefined;
    const abortCtrl = new AbortController();

    if (action === "edit") {
      userApi
        .editUser<UsersResponse>(userId)
        .then((result) => {
          console.log(result);
          setUserData(result);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          handleSetSnackbar({
            open: true,
            type: "error",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            message: "情報取得に失敗しました",
          });
          navigate("/teams", { replace: true });
          setIsLoading(false);
        });
    }

    if (action === "show") {
      userApi
        .getUser<UsersResponse>(userId)
        .then((result) => {
          console.log(result);
          setUserData(result);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          handleSetSnackbar({
            open: true,
            type: "error",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            message: "情報取得に失敗しました",
          });
          navigate("/teams", { replace: true });
          setIsLoading(false);
        });
    }

    return () => {
      abortCtrl.abort();
    };
  }, [userId, action, reloadFlag]);

  return [userData, isLoading];
};
