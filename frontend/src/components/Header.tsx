import { FC, memo, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

// eslint-disable-next-line react/display-name
const Header: FC = memo(() => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const onClickSignOut = () => {
    const options: AxiosRequestConfig = {
      url: "/auth/sign_out",
      method: "DELETE",
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse) => {
        console.log(res);

        if (res.status === 200) {
          Cookies.remove("_access_token");
          Cookies.remove("_client");
          Cookies.remove("_uid");
          setIsSignedIn(false);
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "ログアウトしました",
          });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: `${err.response.data.errors[0]}`,
        });
      });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={Link}
            to={isSignedIn ? `/teams/${currentUser?.team_id}` : "/"}
            sx={{
              flexGrow: 1,
              display: { xs: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DivWork
          </Typography>
          <div>
            {isSignedIn ? (
              <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
                <Button
                  component={Link}
                  to={`/users/${currentUser?.id}/edit`}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {currentUser?.name}
                </Button>
                <Button
                  type="submit"
                  onClick={onClickSignOut}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  サインアウト
                </Button>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
                <Button
                  component={Link}
                  to="/sign_up/teams/select"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  サインアップ
                </Button>
                <Button
                  component={Link}
                  to="/sign_in"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  サインイン
                </Button>
              </Box>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
