import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { HeaderMenuButton } from "./HeaderMenuButton";
import { AuthContext } from "../../providers/AuthProvider";

const drawerWidth = 240;

const MenuBars: FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <Box>
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
      {isSignedIn ? (
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
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : null}
    </Box>
  );
};

export default MenuBars;
