import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import telework from "../../images/telework.png";
import graph from "../../images/graph.png";
import task from "../../images/task.png";
import team from "../../images/team.png";
import folder from "../../images/folder.png";
import screen from "../../images/screen.png";
import { useGuestSignIn } from "../../hooks/useGuestSignIn";

const Home: FC = () => {
  const handleGuestSignIn = useGuestSignIn();

  return (
    <Grid2
      container
      rowSpacing={10}
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
            component={Link}
            to="/sign_up/teams/select"
          >
            ユーザー登録
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/sign_in"
          >
            ログイン
          </Button>
          <Button color="secondary" onClick={handleGuestSignIn}>
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
