import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PriorityTextField = (props: Props) => {
  const { value, onChange } = props;

  const priorities = [
    {
      value: "low",
      label: "低",
    },
    {
      value: "medium",
      label: "中",
    },
    {
      value: "high",
      label: "高",
    },
  ];

  return (
    <div>
      <TextField
        select
        label="優先度"
        name="priority"
        value={value}
        onChange={onChange}
      >
        {priorities.map((priority) => (
          <MenuItem key={priority.value} value={priority.value}>
            {priority.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
