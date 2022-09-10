import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';

export const TasksNewButton = () => {
  return (
    <Button
      variant="contained"
      type="button"
      component={Link}
      to="/tasks/new"
      startIcon={<AddTaskIcon/>}
    >
      新規作成
    </Button>
  );
};
