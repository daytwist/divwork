import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../../utils/axios";
import { AuthPasswordResponse, PasswordState } from "../../../types";
import { AuthContext } from "../../../providers/AuthProvider";
import { SnackbarContext } from "../../../providers/SnackbarProvider";
import { PasswordTextfield } from "./PasswordTextfield";

export const UsersEditPassword = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
  });

  const handleValuesChange =
    (prop: keyof PasswordState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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
        password: values.password,
        password_confirmation: values.passwordConfirmation,
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
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="password"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="新しいパスワード"
          withHelperText
          handleSubmit={undefined}
          required
        />
      </Grid2>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="passwordConfirmation"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="新しいパスワード(確認用)"
          withHelperText={false}
          handleSubmit={handlePasswordUpdate}
          required
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handlePasswordUpdate}
        >
          更新する
        </Button>
      </Grid2>
    </Grid2>
  );
};
