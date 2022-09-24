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
  value: keyof PasswordState;
  values: PasswordState;
  setValues: Dispatch<SetStateAction<PasswordState>>;
  handleChange: (
    prop: keyof PasswordState
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  withHelperText: boolean;
  handleSubmit: (() => void) | undefined;
};

export const PasswordTextfield = (props: Props) => {
  const {
    value,
    values,
    setValues,
    handleChange,
    label,
    withHelperText,
    handleSubmit,
  } = props;

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
      <InputLabel htmlFor={`standard-adornment-${value}`}>{label}</InputLabel>
      <Input
        id={`standard-adornment-${value}`}
        type={values.showPassword ? "text" : "password"}
        value={values[`${value}`]}
        onChange={handleChange(`${value}`)}
        inputProps={{ minLength: 6 }}
        onKeyPress={
          handleSubmit
            ? (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }
            : undefined
        }
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
        <FormHelperText id={`standard-adornment-${value}`}>
          英数字記号6文字以上
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
