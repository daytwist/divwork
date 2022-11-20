import { ChangeEvent } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DividedTask, EditTask } from "../../../types/taskTypes";
import { PriorityTextField } from "./PriorityTextField";
import { DeadlineTextField } from "./DeadlineTextField";

type Props = {
  action: string;
  task: EditTask | DividedTask;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deadline: Date | null;
  onChangeDeadline: (newValue: Date | null) => void;
};

export const TasksForm = (props: Props) => {
  const { action, task, onChange, deadline, onChangeDeadline } = props;

  return (
    <Grid2 container rowSpacing={3} p={0}>
      <Grid2 xs={12}>
        <TextField
          required
          inputProps={{ maxLength: 50 }}
          label="タイトル"
          variant="outlined"
          color="secondary"
          sx={{ width: "100%" }}
          helperText="50文字以内"
          name="title"
          value={task.title}
          onChange={onChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          inputProps={{ maxLength: 400 }}
          label="詳細"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          sx={{ width: "100%" }}
          helperText="400文字以内"
          name="description"
          value={task.description}
          onChange={onChange}
        />
      </Grid2>
      <Grid2 xs={12} sm={4}>
        <PriorityTextField value={task.priority} onChange={onChange} />
      </Grid2>
      <Grid2 xs={12} sm={8} sx={{ mt: { xs: 1, sm: 0 } }}>
        <DeadlineTextField value={deadline} onChange={onChangeDeadline} />
      </Grid2>
      {action === "edit" ? (
        <Grid2 xs={12} sx={{ mt: { xs: 1, sm: 2 } }}>
          <FormControl sx={{ width: "13ch" }}>
            <InputLabel color="secondary" htmlFor="rate-of-progress">
              進捗率
            </InputLabel>
            <OutlinedInput
              color="secondary"
              id="rate-of-progress"
              label="進捗率"
              type="number"
              name="rate_of_progress"
              value={task.rate_of_progress}
              onChange={onChange}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </FormControl>
        </Grid2>
      ) : null}
    </Grid2>
  );
};
