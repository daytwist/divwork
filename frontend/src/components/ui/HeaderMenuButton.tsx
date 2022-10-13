import { MouseEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TaskIcon from "@mui/icons-material/Task";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../providers/AuthProvider";
import { useSignOut } from "../../hooks/auth/useSignOut";

export const HeaderMenuButton = () => {
  const { currentUser } = useContext(AuthContext);
  const handleSignOut = useSignOut();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ alignSelf: "center" }}>
      <Button
        id="header-menu-button"
        aria-controls={open ? "header-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", display: { xs: "none", sm: "flex" } }}
        data-testid="current-user-name"
      >
        <Avatar src={currentUser?.avatar} alt="avatar" sx={{ mr: 1 }} />
        {currentUser?.name}
        <ArrowDropDownIcon fontSize="small" />
      </Button>
      <IconButton
        id="header-menu-button"
        aria-controls={open ? "header-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ display: { xs: "flex", sm: "none" }, p: 0 }}
      >
        <Avatar src={currentUser?.avatar} alt="avatar" />
      </IconButton>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "header-menu-button",
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuList>
          <MenuItem component={Link} to="/teams" onClick={handleClose}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText>チームタスク</ListItemText>
          </MenuItem>
          <MenuItem
            component={Link}
            to={`/users/${currentUser?.id}`}
            onClick={handleClose}
          >
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText>マイタスク</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem component={Link} to="/tasks/new" onClick={handleClose}>
            <ListItemIcon>
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText>新規タスク作成</ListItemText>
          </MenuItem>
          <Divider />
          {currentUser?.admin ? (
            <MenuItem component={Link} to="/teams/edit" onClick={handleClose}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText>チーム設定</ListItemText>
            </MenuItem>
          ) : null}
          {currentUser?.email === "guest@example.com" ? null : (
            <div>
              <MenuItem
                component={Link}
                to={`/users/${currentUser?.id}/edit`}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>アカウント設定</ListItemText>
              </MenuItem>
              <Divider />
            </div>
          )}
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>ログアウト</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
