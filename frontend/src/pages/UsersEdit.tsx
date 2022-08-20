import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import { editUser } from "../types";

const UsersEdit: FC = () => {
  const { user: userData } = useFetchUser();

  const [user, setUser] = useState<editUser>({
    team_id: 0,
    name: "",
    email: "",
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div">
            ユーザー設定
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{user?.team_id}</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="ユーザー名"
            variant="standard"
            sx={{ width: "30ch" }}
            name="name"
            value={user?.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="メールアドレス"
            variant="standard"
            sx={{ width: "30ch" }}
            name="email"
            value={user?.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained">更新する</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">パスワード変更</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersEdit;
