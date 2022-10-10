import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  AppBar,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { AuthContext } from "../../providers/AuthProvider";
import { LeftDrawer } from "./LeftDrawer";

export const MenuBars = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const appBar = useMemo(
    () => (
      <AppBar
        component="header"
        position="fixed"
        sx={{
          zIndex: {
            xs: 1199,
            lg: 1201,
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              flexGrow: 0,
              mr: 2,
              display: { lg: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component={Link}
            to={isSignedIn ? "/teams" : "/"}
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
              <Box sx={{ flexGrow: 0 }}>
                <HeaderMenuButton />
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  component={Link}
                  to="/sign_up/teams/select"
                  sx={{ my: { xs: 1, md: 2 }, color: "black" }}
                >
                  ユーザー登録
                </Button>
                <Button
                  component={Link}
                  to="/sign_in"
                  sx={{ my: { xs: 1, md: 2 }, color: "black" }}
                >
                  ログイン
                </Button>
              </Box>
            )}
          </div>
        </Toolbar>
      </AppBar>
    ),
    [isSignedIn, currentUser]
  );

  return (
    <Box>
      {appBar}
      {isSignedIn ? (
        <LeftDrawer open={open} onClose={handleDrawerToggle} />
      ) : null}
    </Box>
  );
};
