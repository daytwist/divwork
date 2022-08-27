import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { useFetchUser } from "../hooks/useFetchUser";
import { AuthContext } from "../providers/AuthProvider";
import { User, UsersResponse } from "../types";
import { SnackbarContext } from "../providers/SnackbarProvider";

const UsersEdit: FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { user: userData } = useFetchUser();

  const [user, setUser] = useState<User>({
    team_id: 0,
    name: "",
    email: "",
    id: 0,
    provider: "",
    uid: "",
    allow_password_change: false,
    nickname: "",
    image: "",
    created_at: new Date(),
    updated_at: new Date(),
    tasks_count: [0],
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUsersUpdate = () => {
    const updateOptions: AxiosRequestConfig = {
      url: "/auth",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: user,
    };

    axiosInstance(updateOptions)
      .then((res: AxiosResponse<UsersResponse>) => {
        console.log(res);

        if (res.status === 200) {
          setCurrentUser(user);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "ユーザー情報を更新しました",
          });
          navigate(`/users/${currentUser?.id}`, { replace: false });
        }
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

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            ユーザー設定
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{user?.team_id}</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="ユーザー名"
            variant="standard"
            sx={{ width: "30ch" }}
            name="name"
            value={user?.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="メールアドレス"
            variant="standard"
            sx={{ width: "30ch" }}
            name="email"
            value={user?.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" onClick={handleUsersUpdate}>
            更新する
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">パスワード変更</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersEdit;
