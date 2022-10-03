import { FC, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { AuthResponse } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import telework from "../../images/telework.png";

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
      <Grid2 container spacing={15}>
        <Grid2 xs={6}>
          <Stack direction="column" spacing={2} alignItems="flex-start">
            <Typography variant="h2" component="div" data-testid="home-title">
              DivWork
            </Typography>
            <Typography variant="h6" component="div">
              チーム作業のためのタスク管理サービス
            </Typography>
            <Button
              variant="contained"
              type="button"
              component={Link}
              to="/sign_up/teams/select"
            >
              ユーザー登録
            </Button>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              component={Link}
              to="/sign_in"
            >
              ログイン
            </Button>
            <Button color="secondary" type="button" onClick={handleGuestSignIn}>
              ゲストユーザーでログイン
            </Button>
          </Stack>
        </Grid2>
        <Grid2 xs={6}>
          <Box sx={{ width: 380, mt: 2 }}>
            <img src={telework} alt="telework" width="100%" height="100%" />
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Home;
