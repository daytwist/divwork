import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PasswordState } from "../../../types";

type Props = {
  values: PasswordState;
  setValues: Dispatch<SetStateAction<PasswordState>>;
  handleChange: (
    prop: keyof PasswordState
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  withHelperText: boolean;
};

export const PasswordTextfield = (props: Props) => {
  const { values, setValues, handleChange, withHelperText } = props;

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ width: "30ch" }} variant="standard" color="secondary">
      <InputLabel htmlFor="standard-adornment-password">パスワード</InputLabel>
      <Input
        id="standard-adornment-password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        inputProps={{ minLength: 6 }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {withHelperText ? (
        <FormHelperText id="standard-adornment-password">
          英数字記号6文字以上
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
