import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Button, Stack, Tab, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { User } from "../../types/userTypes";
import { useFetchUser } from "../../hooks/useFetchUser";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { AlertDialog } from "../ui/AlertDialog";
import { UsersEditProfile } from "../models/user/UsersEditProfile";
import { UsersEditPassword } from "../models/user/UsersEditPassword";
import { BackIconButton } from "../ui/BackIconButton";

export const UsersEdit = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { user: userData } = useFetchUser({
    action: "edit",
    flag: undefined,
  });

  const [user, setUser] = useState<User>({
    team_id: 0,
    name: "",
    email: "",
    id: 0,
    provider: "",
    uid: "",
    allow_password_change: false,
    nickname: "",
    image: "",
    created_at: new Date(),
    updated_at: new Date(),
    unfinished_tasks_priority_count: [0],
    unfinished_tasks_deadline_count: [0],
    avatar: "",
    admin: false,
  });

  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsersDelete = () => {
    const options: AxiosRequestConfig = {
      url: "/auth",
      method: "DELETE",
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    };

    baseAxios(options)
      .then((res: AxiosResponse) => {
        console.log(res);
        setIsSignedIn(false);
        handleSetSnackbar({
          open: true,
          type: "success",
          message:
            "アカウントを削除しました。またのご利用をお待ちしております。",
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.error,
        });
      });
  };

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <Grid2 container direction="column" rowSpacing={2}>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BackIconButton />
          <Typography variant="h4" component="div">
            アカウント設定
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <Box sx={{ width: 370 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="プロフィール" value="1" />
                <Tab label="パスワード再設定" value="2" />
                <Tab label="その他" value="3" />
              </TabList>
            </Box>
            <Grid2 container direction="column" alignContent="center">
              <TabPanel value="1">
                <Grid2>
                  <UsersEditProfile user={user} setUser={setUser} />
                </Grid2>
              </TabPanel>
              <TabPanel value="2">
                <Grid2>
                  <UsersEditPassword />
                </Grid2>
              </TabPanel>
              <TabPanel value="3">
                <Grid2>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    アカウント削除
                  </Button>
                  <AlertDialog
                    open={open}
                    handleClose={handleClose}
                    objectName="アカウント"
                    onClick={handleUsersDelete}
                  />
                </Grid2>
              </TabPanel>
            </Grid2>
          </TabContext>
        </Box>
      </Grid2>
    </Grid2>
  );
};
