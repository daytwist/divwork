import { FC, useCallback, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Box,
  Button,
  Typography,
  Avatar,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchTeam } from "../../hooks/useFetchTeam";

const drawerWidth = 240;

const MenuBars: FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const { team, users } = useFetchTeam();

  const unfinishedTasksCount = useCallback((tasks: number[]) => {
    const total = tasks.reduce((sum: number, element: number) => {
      return sum + element;
    }, 0);
    return total;
  }, []);

  const appBar = useMemo(
    () => (
      <AppBar
        position="fixed"
        sx={{
          width: isSignedIn ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
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
    ),
    [currentUser]
  );

  const drawer = useMemo(
    () => (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/teams/${team?.id}`}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText
                primary={team?.name}
                secondary={`${users?.length}人のメンバー`}
              />
            </ListItemButton>
          </ListItem>
          {users?.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton component={Link} to={`/users/${user.id}`}>
                <ListItemAvatar>
                  <Avatar src={user.avatar} alt="avatar" />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`${unfinishedTasksCount(
                    user.unfinished_tasks_priority_count
                  )}件のタスク`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    ),
    [team, users]
  );

  return (
    <Box>
      {appBar}
      {isSignedIn ? drawer : null}
    </Box>
  );
};

export default MenuBars;
