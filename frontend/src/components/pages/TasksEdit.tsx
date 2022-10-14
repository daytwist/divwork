import { ChangeEvent, useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { EditTask } from "../../types/taskTypes";
import { useFetchTask } from "../../hooks/task/useFetchTask";
import { TasksForm } from "../models/task/TasksForm";
import { BackIconButton } from "../ui/BackIconButton";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { usePatchTask } from "../../hooks/task/usePatchTask";

export const TasksEdit = () => {
  const [taskData, isLoading] = useFetchTask("edit");

  const [task, setTask] = useState<EditTask>({
    title: "",
    description: "",
    priority: "",
    rate_of_progress: 0,
    user_id: 0,
  });
  const [deadline, setDeadline] = useState<Date | null>(new Date());

  const handleUpdateTask = usePatchTask({ task, deadline });

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
    if (taskData?.task) {
      setTask(taskData.task);
      setDeadline(taskData.task.deadline);
    }
  }, [taskData?.task]);

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
            タスクを編集する
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <TasksForm
          action="edit"
          task={task}
          onChange={handleInputChange}
          deadline={deadline}
          onChangeDeadline={handleDeadlineChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button variant="contained" type="submit" onClick={handleUpdateTask}>
          完了
        </Button>
      </Grid2>
    </Grid2>
  );
};
