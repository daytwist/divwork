import { FC, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
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
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);
        setIsSignedIn(true);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "ゲストログインしました",
        });
        navigate("/teams", { replace: false });
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
      <Grid2 container direction="column" rowSpacing={2}>
        <Grid2 xs={12}>
          <Button
            variant="contained"
            type="button"
            component={Link}
            to="/sign_up/teams/select"
          >
            ユーザー登録
          </Button>
        </Grid2>
        <Grid2 xs={12}>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            component={Link}
            to="/sign_in"
          >
            ログイン
          </Button>
        </Grid2>
        <Grid2 xs={12}>
          <Button color="secondary" type="button" onClick={handleGuestSignIn}>
            ゲストユーザーでログイン
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Home;
