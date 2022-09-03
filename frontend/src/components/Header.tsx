import { FC, memo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { HeaderMenuButton } from "./HeaderMenuButton";

// eslint-disable-next-line react/display-name
const Header: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to={isSignedIn ? `/teams/${currentUser?.team_id}` : "/"}
            sx={{
              flexGrow: 1,
              display: "block",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DivWork
          </Typography>
          <div>
            {isSignedIn ? (
              <Box sx={{ flexGrow: 0, display: "flex" }}>
                <HeaderMenuButton />
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0, display: "flex" }}>
                <Button
                  component={Link}
                  to="/sign_up/teams/select"
                  sx={{ my: 2, color: "black", display: "flex" }}
                >
                  ユーザー登録
                </Button>
                <Button
                  component={Link}
                  to="/sign_in"
                  sx={{ my: 2, color: "black", display: "flex" }}
                >
                  ログイン
                </Button>
              </Box>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Header;
