import { FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { AuthResponse } from "../../types/index";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type State = {
  teamId: number;
  teamName: string;
  isAdmin: boolean;
};

const SignUp: FC = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const location = useLocation();
  const { teamId, teamName, isAdmin } = location.state as State;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "POST",
      params: {
        name,
        email,
        password,
        team_id: teamId,
        admin: isAdmin,
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
            message: "ユーザー登録しました",
          });
          navigate(`/teams/${res.data.data.team_id}`, { replace: false });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          message: `${err.response.data.errors.full_messages.join("。")}`,
        });
      });
  };

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          ユーザー登録
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="h6" component="div">
          {teamName}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          type="text"
          label="ユーザー名"
          variant="standard"
          sx={{ width: "30ch" }}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          type="email"
          label="メールアドレス"
          variant="standard"
          sx={{ width: "30ch" }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          type="password"
          label="パスワード"
          variant="standard"
          sx={{ width: "30ch" }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button variant="contained" type="submit" onClick={handleSignUp}>
          登録する
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default SignUp;
