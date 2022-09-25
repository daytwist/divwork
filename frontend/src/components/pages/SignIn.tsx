import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { AuthContext } from "../../providers/AuthProvider";
import { AuthResponse, PasswordState } from "../../types";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { PasswordTextfield } from "../models/user/PasswordTextfield";

const SignIn: FC = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [values, setValues] = useState<PasswordState>({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
  });

  const handleValuesChange =
    (prop: keyof PasswordState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSignIn = () => {
    const options: AxiosRequestConfig = {
      url: "/auth/sign_in",
      method: "POST",
      params: {
        email,
        password: values.password,
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<AuthResponse>) => {
        console.log(res);

        if (res.status === 200) {
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers.client);
          Cookies.set("_uid", res.headers.uid);
          setIsSignedIn(true);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "ログインしました",
          });
          navigate(`/teams/${res.data.data.team_id}`, { replace: false });
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
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          ログイン
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          type="email"
          label="メールアドレス"
          variant="standard"
          color="secondary"
          sx={{ width: "30ch" }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="password"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="パスワード"
          withHelperText={false}
          handleSubmit={handleSignIn}
          required={false}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          data-testid="sign-in-button"
          variant="contained"
          type="submit"
          onClick={handleSignIn}
        >
          ログイン
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default SignIn;
