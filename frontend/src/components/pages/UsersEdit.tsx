import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Stack, SxProps, Tab, Theme, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { User } from "../../types/userTypes";
import { useFetchUser } from "../../hooks/user/useFetchUser";
import { UsersEditProfile } from "../models/user/UsersEditProfile";
import { UsersEditPassword } from "../models/user/UsersEditPassword";
import { BackIconButton } from "../ui/BackIconButton";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { DeleteAccountButton } from "../models/user/DeleteAccountButton";

export const UsersEdit = () => {
  const [userData, isLoading] = useFetchUser(undefined, "edit");
  const [value, setValue] = useState("1");

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

  const tabSx: SxProps<Theme> = {
    px: { xs: 1, sm: 2 },
    py: { xs: 0.5, sm: 1.5 },
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
        <Box sx={{ width: { xs: 300, sm: 350 } }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="プロフィール" value="1" sx={tabSx} />
                <Tab label="パスワード" value="2" sx={tabSx} />
                <Tab label="その他" value="3" sx={tabSx} />
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
                  <DeleteAccountButton />
                </Grid2>
              </TabPanel>
            </Grid2>
          </TabContext>
        </Box>
      </Grid2>
    </Grid2>
  );
};
