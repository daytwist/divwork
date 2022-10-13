import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Button, Stack, Tab, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { User } from "../../types/userTypes";
import { useFetchUser } from "../../hooks/user/useFetchUser";
import { AlertDialog } from "../ui/AlertDialog";
import { UsersEditProfile } from "../models/user/UsersEditProfile";
import { UsersEditPassword } from "../models/user/UsersEditPassword";
import { BackIconButton } from "../ui/BackIconButton";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";

export const UsersEdit = () => {
  const [userData, isLoading] = useFetchUser(undefined, "edit");
  const handleDeleteUser = useDeleteUser();

  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
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

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userData?.user) {
      setUser(userData.user);
    }
  }, [userData?.user]);

  if (isLoading) {
    return <LoadingColorRing />;
  }

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
                    onClick={handleDeleteUser}
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
