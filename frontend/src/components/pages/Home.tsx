import { FC, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { AuthResponse } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const Home: FC = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleGuestSignIn = () => {
    const options: AxiosRequestConfig = {
      url: "/auth/guest_sign_in",
      method: "POST",
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
            message: "ゲストログインしました",
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
      <Typography
        variant="h2"
        component="div"
        gutterBottom
        data-testid="home-title"
      >
        DivWork
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            type="button"
            component={Link}
            to="/sign_up/teams/select"
          >
            ユーザー登録
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            component={Link}
            to="/sign_in"
          >
            ログイン
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" type="button" onClick={handleGuestSignIn}>
            ゲストユーザーでログイン
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
