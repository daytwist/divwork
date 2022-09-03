import { FC, MouseEvent, useContext, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
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
        {currentUser?.name}
      </Button>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "header-menu-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
