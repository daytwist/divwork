import { ChangeEvent, MouseEvent } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { EditTask } from "../../../types";
import { PriorityTextField } from "./PriorityTextField";
import { DeadlineTextField } from "./DeadlineTextField";

type Props = {
  action: string;
  task: EditTask;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deadline: Date | null;
  onChangeDeadline: (newValue: Date | null) => void;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TasksForm = (props: Props) => {
  const { action, task, onChange, deadline, onChangeDeadline, onClick } = props;

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <TextField
          label="タイトル"
          variant="outlined"
          sx={{ width: "50ch" }}
          name="title"
          value={task.title}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
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
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={5}>
          <PriorityTextField value={task.priority} onChange={onChange} />
          <DeadlineTextField value={deadline} onChange={onChangeDeadline} />
        </Stack>
      </Grid>
      {action === "edit" ? (
        <Grid item>
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
        </Grid>
      ) : null}
      <Grid item>
        <Button variant="contained" type="submit" onClick={onClick}>
          完了
        </Button>
      </Grid>
    </Grid>
  );
};
