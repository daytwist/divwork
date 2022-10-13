import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { AuthContext } from "../../providers/AuthProvider";

type Props = {
  onClick: () => void;
};

export const Header = (props: Props) => {
  const { onClick } = props;
  const { isSignedIn } = useContext(AuthContext);

  return (
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
          onClick={onClick}
          sx={{
            flexGrow: 0,
            mr: 2,
            display: { xs: isSignedIn ? "flex" : "none", lg: "none" },
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
  );
};
