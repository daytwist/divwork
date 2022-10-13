import { ChangeEvent, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PasswordState } from "../../types/userTypes";
import { PasswordTextfield } from "../models/user/PasswordTextfield";
import { BackButton } from "../ui/BackButton";
import { useSignIn } from "../../hooks/user/useSignIn";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<PasswordState>({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
  });

  const handleSignIn = useSignIn(email, values.password);

  const handleValuesChange =
    (prop: keyof PasswordState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          ログイン
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          type="email"
          label="メールアドレス"
          variant="standard"
          color="secondary"
          sx={{ width: "30ch" }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="password"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="パスワード"
          withHelperText={false}
          handleSubmit={handleSignIn}
          required={false}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1}>
          <Button
            data-testid="sign-in-button"
            variant="contained"
            type="submit"
            onClick={handleSignIn}
          >
            ログイン
          </Button>
          <BackButton />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
