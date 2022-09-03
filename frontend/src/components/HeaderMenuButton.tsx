import { FC, MouseEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar, Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const HeaderMenuButton: FC = () => {
  const { setIsSignedIn, currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
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
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "ログアウトしました",
          });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: `${err.response.data.errors[0]}`,
        });
      });
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
        <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
      </Menu>
    </Box>
  );
};
