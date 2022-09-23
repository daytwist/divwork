import { ChangeEvent } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DivisionTask, EditTask } from "../../../types";
import { PriorityTextField } from "./PriorityTextField";
import { DeadlineTextField } from "./DeadlineTextField";

type Props = {
  action: string;
  task: EditTask | DivisionTask;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deadline: Date | null;
  onChangeDeadline: (newValue: Date | null) => void;
};

export const TasksForm = (props: Props) => {
  const { action, task, onChange, deadline, onChangeDeadline } = props;

  return (
    <Grid2 container direction="column" rowSpacing={4} p={0}>
      <Grid2 xs={12}>
        <TextField
          label="タイトル"
          variant="outlined"
          sx={{ width: "50ch" }}
          name="title"
          value={task.title}
          onChange={onChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          label="詳細"
          variant="outlined"
          multiline
          rows={4}
          sx={{ width: "50ch" }}
          name="description"
          value={task.description}
          onChange={onChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={5}>
          <PriorityTextField value={task.priority} onChange={onChange} />
          <DeadlineTextField value={deadline} onChange={onChangeDeadline} />
        </Stack>
      </Grid2>
      {action === "edit" ? (
        <Grid2 xs={12}>
          <FormControl sx={{ width: "10ch" }}>
            <InputLabel htmlFor="rate-of-progress">進捗率</InputLabel>
            <OutlinedInput
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
