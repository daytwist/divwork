import { ChangeEvent, useState } from "react";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PasswordState } from "../../../types/userTypes";
import { PasswordTextfield } from "./PasswordTextfield";
import { usePatchPassword } from "../../../hooks/user/usePatchPassword";

export const UsersEditPassword = () => {
  const [values, setValues] = useState({
    password: "",
    passwordConfirmation: "",
    showPassword: false,
  });

  const handleUpdatePassword = usePatchPassword({ values });

  const handleValuesChange =
    (prop: keyof PasswordState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="password"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="新しいパスワード"
          withHelperText
          handleSubmit={undefined}
          required
        />
      </Grid2>
      <Grid2 xs={12}>
        <PasswordTextfield
          value="passwordConfirmation"
          values={values}
          setValues={setValues}
          handleChange={handleValuesChange}
          label="新しいパスワード(確認用)"
          withHelperText={false}
          handleSubmit={handleUpdatePassword}
          required
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleUpdatePassword}
        >
          更新する
        </Button>
      </Grid2>
    </Grid2>
  );
};
