import { FC, MouseEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthContext } from "../providers/AuthProvider";

export const HeaderMenuButton: FC = () => {
  const { currentUser } = useContext(AuthContext);

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
        sx={{ color: "black" }}
        data-testid="current-user-name"
      >
        {currentUser?.avatar ? (
          <Avatar src={currentUser.avatar} alt="avatar" sx={{ mr: 1 }} />
        ) : (
          <Avatar sx={{ mr: 1 }} />
        )}
        {currentUser?.name}
        <ArrowDropDownIcon fontSize="small" />
      </Button>
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
        <MenuItem
          component={Link}
          to={`/teams/${currentUser?.team_id}`}
          onClick={handleClose}
        >
          チームタスク一覧
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/users/${currentUser?.id}`}
          onClick={handleClose}
        >{`${currentUser?.name}のタスク一覧`}</MenuItem>
        <Divider />
        <MenuItem
          component={Link}
          to={`/users/${currentUser?.id}/edit`}
          onClick={handleClose}
        >
          ユーザー設定
        </MenuItem>
      </Menu>
    </Box>
  );
};
