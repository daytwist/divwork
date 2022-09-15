import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props = {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
};

export const DeadlineTextField = (props: Props) => {
  const { value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(dateTimeProps) => <TextField {...dateTimeProps} />}
        label="納期"
        value={value}
        onChange={onChange}
        inputFormat="yyyy/MM/dd hh:mm a"
      />
    </LocalizationProvider>
  );
};
