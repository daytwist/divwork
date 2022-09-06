import { ChangeEvent, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

export const UsersEditPassword = () => {
  const [newPasswords, setNewPasswords] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChangePasswords = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewPasswords({ ...newPasswords, [name]: value });
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <TextField
          type="password"
          label="新しいパスワード"
          variant="standard"
          sx={{ width: "30ch" }}
          name="password"
          value={newPasswords.password}
          onChange={handleInputChangePasswords}
        />
      </Grid>
      <Grid item>
        <TextField
          type="password"
          label="新しいパスワード(確認用)"
          variant="standard"
          sx={{ width: "30ch" }}
          name="passwordConfirmation"
          value={newPasswords.passwordConfirmation}
          onChange={handleInputChangePasswords}
        />
      </Grid>
      <Grid item>
        <Button color="secondary" variant="contained">
          パスワード変更
        </Button>
      </Grid>
    </Grid>
  );
};
