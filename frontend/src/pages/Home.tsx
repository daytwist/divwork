import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthResponse } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const Home: FC = () => {
  const { setIsSignedIn } = useContext(AuthContext);
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
          navigate(`/teams/${res.data.data.team_id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="div" gutterBottom>
        DivWork
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            type="button"
            href="/sign_up/teams/select"
          >
            サインアップ
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" type="button" href="/sign_in">
            サインイン
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" type="button" onClick={handleGuestSignIn}>
            ゲストユーザーとしてログイン
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
