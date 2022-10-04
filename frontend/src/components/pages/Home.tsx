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
import graph from "../../images/graph.png";
import task from "../../images/task.png";
import team from "../../images/team.png";
import folder from "../../images/folder.png";
import screen from "../../images/screen.png";

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
    <Grid2
      container
      rowSpacing={15}
      columnSpacing={10}
      alignItems="center"
      sx={{ pt: 3 }}
    >
      <Grid2 xs={6}>
        <Stack direction="column" spacing={2} alignItems="flex-start" mb={4}>
          <Typography variant="h2" component="div" data-testid="home-title">
            DivWork
          </Typography>
          <Typography variant="h5" component="div">
            チーム作業のためのタスク管理ツール
          </Typography>
        </Stack>
        <Stack direction="column" spacing={2} alignItems="flex-start">
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
        <Box sx={{ width: 390, m: "auto" }}>
          <img src={telework} alt="telework" width="100%" height="100%" />
        </Box>
      </Grid2>
      <Grid2 xs={6}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="div">
            メンバーと協力してタスクを進める
          </Typography>
          <Typography variant="h6" component="div" color="text.secondary">
            DivWorkはチームでタスクを共有、管理が出来るツールです。また、タスクをメンバーと分担することが出来るので、チーム内での協力、助け合いをサポートします。
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={6}>
        <Box sx={{ width: 400, mx: "auto" }}>
          <img src={screen} alt="screen" width="100%" height="100%" />
        </Box>
      </Grid2>
      <Grid2 xs={12}>
        <Grid2 container rowSpacing={5} columnSpacing={10}>
          <Grid2 xs={12}>
            <Typography variant="h5" component="div" textAlign="center">
              チームのタスク管理に必要な機能が充実
            </Typography>
          </Grid2>
          <Grid2 xs={2}>
            <img src={graph} alt="graph" width={150} />
          </Grid2>
          <Grid2 xs={4}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6" component="div">
                チーム状況管理
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
              >
                タスク件数をグラフ化し、メンバーの状況を一目で把握出来ます。優先度表示または納期表示に切り替えることが出来ます。
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 xs={2}>
            <img src={task} alt="task" width={130} />
          </Grid2>
          <Grid2 xs={4}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6" component="div">
                納期/進捗管理
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
              >
                タスクの納期、進捗率をデータテーブルで確認することが出来ます。絞り込みやソートすることも出来ます。
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 xs={2}>
            <img src={team} alt="team" width={140} />
          </Grid2>
          <Grid2 xs={4}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6" component="div">
                タスク分担機能
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
              >
                タスクはチームのメンバーと簡単に分担することが出来ます。他メンバーのタスクを分担することも出来ます。
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 xs={2}>
            <img src={folder} alt="folder" width={150} />
          </Grid2>
          <Grid2 xs={4}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h6" component="div">
                分担タスク管理
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
              >
                メンバーの分担履歴を確認することが出来ます。また、関連タスクの進捗状況を確認することが出来ます。
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Home;
