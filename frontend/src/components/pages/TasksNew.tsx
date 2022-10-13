import { ChangeEvent, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { EditTask } from "../../types/taskTypes";
import { TasksForm } from "../models/task/TasksForm";
import { BackIconButton } from "../ui/BackIconButton";
import { usePostTask } from "../../hooks/usePostTask";

export const TasksNew = () => {
  const [task, setTask] = useState<EditTask>({
    title: "",
    description: "",
    priority: "",
    rate_of_progress: 0,
    user_id: 0,
  });
  const [deadline, setDeadline] = useState<Date | null>(new Date());

  const handleCreateTask = usePostTask({ task, deadline });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleDeadlineChange = (newValue: Date | null) => {
    setDeadline(newValue);
  };

  return (
    <Grid2 container direction="column" rowSpacing={3} width={700}>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BackIconButton />
          <Typography gutterBottom variant="h4" component="div">
            タスクを作成する
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <TasksForm
          action="new"
          task={task}
          onChange={handleInputChange}
          deadline={deadline}
          onChangeDeadline={handleDeadlineChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button variant="contained" type="submit" onClick={handleCreateTask}>
          完了
        </Button>
      </Grid2>
    </Grid2>
  );
};
