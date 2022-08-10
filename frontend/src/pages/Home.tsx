import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <Link style={{ textDecoration: "none" }} to="/sign_up/teams/select">
            <Button variant="contained" type="button">
              サインアップ
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link style={{ textDecoration: "none" }} to="/sign_in">
            <Button variant="outlined" type="button">
              サインイン
            </Button>
          </Link>
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
