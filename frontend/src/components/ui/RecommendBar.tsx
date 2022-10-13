import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useGuestSignIn } from "../../hooks/auth/useGuestSignIn";

export const RecommendBar = () => {
  const handleGuestSignIn = useGuestSignIn();

  return (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
      <Stack spacing={3} mx={6} my={8} alignItems="center">
        <Typography variant="h4" component="div">
          DivWorkを始めよう
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
          ゲストログインでユーザー登録せずに機能を試すことが出来ます。
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
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
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
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
      </Stack>
    </Box>
  );
};
