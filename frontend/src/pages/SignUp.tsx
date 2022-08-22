import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthResponse } from "../types/index";

type State = {
  teamId: number;
  teamName: string;
};

const SignUp: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const location = useLocation();
  const { teamId, teamName } = location.state as State;

  const onClickSignUp = () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "POST",
      params: {
        name,
        email,
        password,
        team_id: teamId,
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<AuthResponse>) => {
        console.log(res);

        if (res.status === 200) {
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers.client);
          Cookies.set("_uid", res.headers.uid);

          navigate(`/teams/${res.data.data.team_id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            サインアップ
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" component="div">
            {teamName}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            type="text"
            label="ユーザー名"
            variant="standard"
            sx={{ width: "30ch" }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
          <Button variant="contained" type="submit" onClick={onClickSignUp}>
            サインアップ
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
