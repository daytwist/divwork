import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, TextField } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthPasswordResponse } from "../types";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const UsersEditPassword = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [newPasswords, setNewPasswords] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChangePasswords = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewPasswords({ ...newPasswords, [name]: value });
  };

  const handlePasswordUpdate = () => {
    const options: AxiosRequestConfig = {
      url: "/auth/password",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: {
        password: newPasswords.password,
        password_confirmation: newPasswords.passwordConfirmation,
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<AuthPasswordResponse>) => {
        console.log(res);

        if (res.status === 200) {
          setCurrentUser(res.data.data);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "パスワードを更新しました",
          });
          navigate(`/users/${currentUser?.id}`, { replace: false });
        }
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

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <TextField
          type="password"
          label="新しいパスワード"
          variant="standard"
          sx={{ width: "30ch" }}
          name="password"
          value={newPasswords.password}
          onChange={handleInputChangePasswords}
        />
      </Grid>
      <Grid item>
        <TextField
          type="password"
          label="新しいパスワード(確認用)"
          variant="standard"
          sx={{ width: "30ch" }}
          name="passwordConfirmation"
          value={newPasswords.passwordConfirmation}
          onChange={handleInputChangePasswords}
        />
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={handlePasswordUpdate}
        >
          更新する
        </Button>
      </Grid>
    </Grid>
  );
};
