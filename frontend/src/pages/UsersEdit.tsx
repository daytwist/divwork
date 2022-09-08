import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { User } from "../types";
import { useFetchUser } from "../hooks/useFetchUser";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { AlertDialog } from "../components/AlertDialog";
import { UsersEditProfile } from "./UsersEditProfile";
import { UsersEditPassword } from "./UsersEditPassword";

const UsersEdit: FC = () => {
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
    unfinished_tasks_count: [0],
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

    axiosInstance(options)
      .then((res: AxiosResponse) => {
        console.log(res);

        if (res.status === 200) {
          setIsSignedIn(false);
          handleSetSnackbar({
            open: true,
            type: "success",
            message:
              "アカウントを削除しました。またのご利用をお待ちしております。",
          });
          navigate("/", { replace: true });
        }
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
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4" component="div">
            アカウント設定
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ width: 400 }}>
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
              <TabPanel value="1">
                <Grid container justifyContent="center">
                  <Grid item>
                    <UsersEditProfile user={user} setUser={setUser} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container justifyContent="center">
                  <Grid item>
                    <UsersEditPassword />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container justifyContent="center">
                  <Grid item>
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
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersEdit;
