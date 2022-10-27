import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { User } from "../../types/userTypes";
import { DivisionTask } from "../../types/taskTypes";
import { TasksForm } from "../models/task/TasksForm";
import { BackIconButton } from "../ui/BackIconButton";
import { usePostDivision } from "../../hooks/division/usePostDivision";
import { useFetchNewDivision } from "../../hooks/division/useFetchNewDivision";
import { LoadingColorRing } from "../ui/LoadingColorRing";

export const DivisionsNew = () => {
  const [divisionData, isLoading] = useFetchNewDivision();

  const [task, setTask] = useState<DivisionTask>({
    title: "",
    description: "",
    priority: "",
    rate_of_progress: 0,
    parent_id: 0,
  });

  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [comment, setComment] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [teamMemberValue, setTeamMemberValue] = useState<string>("");

  const handleCreateDivision = usePostDivision({
    task,
    deadline,
    comment,
    teamMemberValue,
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleDeadlineChange = (newValue: Date | null) => {
    setDeadline(newValue);
  };

  useEffect(() => {
    if (divisionData) {
      setTask(divisionData?.task);
      setDeadline(divisionData?.task.deadline);
      setTeamMembers(divisionData?.team_members);
    }
  }, [divisionData]);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  return (
    <Grid2
      container
      direction="column"
      rowSpacing={3}
      sx={{ width: { xs: 300, sm: 500, lg: 700 } }}
    >
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BackIconButton />
          <Typography gutterBottom variant="h4" component="div">
            タスクを分担する
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <TasksForm
          action="divisionsNew"
          task={task}
          onChange={handleInputChange}
          deadline={deadline}
          onChangeDeadline={handleDeadlineChange}
        />
      </Grid2>
      <Divider sx={{ my: { xs: 2, sm: 4 } }} />
      <Grid2 xs={12}>
        <FormControl required sx={{ width: 200 }} color="secondary">
          <InputLabel id="users_label">分担先ユーザー</InputLabel>
          <Select
            labelId="users_label"
            name="user_id"
            value={teamMemberValue}
            onChange={(event) => setTeamMemberValue(event.target.value)}
            input={<OutlinedInput label="分担先ユーザー" />}
            MenuProps={MenuProps}
          >
            {teamMembers.map((member) => (
              <MenuItem key={member.id} value={member.id.toString()}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          inputProps={{ maxLength: 100 }}
          label="分担コメント"
          variant="outlined"
          color="secondary"
          sx={{ width: "100%" }}
          helperText="100文字以内"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          data-testid="send-button"
          variant="contained"
          type="submit"
          onClick={handleCreateDivision}
          startIcon={<AutoAwesomeIcon />}
        >
          分担する
        </Button>
      </Grid2>
    </Grid2>
  );
};
