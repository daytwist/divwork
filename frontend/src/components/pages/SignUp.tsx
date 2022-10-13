import { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PasswordState } from "../../types/userTypes";
import { PasswordTextfield } from "../models/user/PasswordTextfield";
import { BackButton } from "../ui/BackButton";
import { useSignUp } from "../../hooks/auth/useSignUp";

type State = {
  teamId: number;
  teamName: string;
  isAdmin: boolean;
};

export const SignUp = () => {
  const location = useLocation();
  const { teamId, teamName, isAdmin } = location.state as State;

  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [values, setValues] = useState({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
  });

  const handleSignUp = useSignUp({
    name: user.name,
    email: user.email,
    password: values.password,
    teamId,
    isAdmin,
  });

  const handleUserChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleValuesChange =
    (prop: keyof PasswordState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <Grid2 container direction="column" rowSpacing={4}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          ユーザー登録
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="body1" component="div">
          所属チーム：{teamName}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          required
          inputProps={{ maxLength: 10 }}
          type="text"
          label="ユーザー名"
          color="secondary"
          variant="standard"
          sx={{ width: "30ch" }}
          helperText="10文字以内"
          name="name"
          value={user.name}
          onChange={handleUserChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          required
          type="email"
          label="メールアドレス"
          color="secondary"
          variant="standard"
          sx={{ width: "30ch" }}
          name="email"
          value={user.email}
          onChange={handleUserChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="password"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="パスワード"
          withHelperText
          handleSubmit={handleSignUp}
          required
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" type="submit" onClick={handleSignUp}>
            登録する
          </Button>
          <BackButton />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
