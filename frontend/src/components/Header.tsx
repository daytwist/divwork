import { FC, memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

// eslint-disable-next-line react/display-name
const Header: FC = memo(() => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
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
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DivWork
          </Typography>
          <>
            {isSignedIn && (
              <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
                <Button
                  href={`/users/${currentUser?.id}/edit`}
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
            )}
            {isSignedIn || (
              <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
                <Button
                  href="/sign_up/teams/select"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  サインアップ
                </Button>
                <Button
                  href="/sign_in"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  サインイン
                </Button>
              </Box>
            )}
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
