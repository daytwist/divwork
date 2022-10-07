import { FC, useCallback, useContext, useMemo, useState } from "react";
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
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchTeam } from "../../hooks/useFetchTeam";

const drawerWidth = 240;

interface Props {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}

const MenuBars: FC = (props: Props) => {
  const { window } = props;
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const { team, users } = useFetchTeam();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const unfinishedTasksCount = useCallback((tasks: number[]) => {
    const total = tasks.reduce((sum: number, element: number) => {
      return sum + element;
    }, 0);
    return total;
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  const drawer = useMemo(
    () => (
      <div>
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/teams">
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
      </div>
    ),
    [team, users, isSignedIn, currentUser]
  );

  return (
    <Box>
      {appBar}
      {isSignedIn && team ? (
        <Box
          component="nav"
          sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", lg: "none" },
              zIndex: 1200,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", lg: "block" },
              zIndex: 1200,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      ) : null}
    </Box>
  );
};

export default MenuBars;
