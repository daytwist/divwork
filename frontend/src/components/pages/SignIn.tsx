import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { AuthContext } from "../../providers/AuthProvider";
import { AuthResponse } from "../../types";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const SignIn: FC = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = () => {
    const options: AxiosRequestConfig = {
      url: "/auth/sign_in",
      method: "POST",
      params: { email, password },
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
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            ログイン
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            type="email"
            label="メールアドレス"
            variant="standard"
            sx={{ width: "30ch" }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            label="パスワード"
            variant="standard"
            sx={{ width: "30ch" }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            data-testid="sign-in-button"
            variant="contained"
            type="submit"
            onClick={handleSignIn}
          >
            ログイン
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
