import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

export const TasksNewButton = () => {
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        type="button"
        component={Link}
        to="/tasks/new"
        startIcon={<AddTaskIcon />}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        新規作成
      </Button>
      <Button
        size="medium"
        variant="contained"
        type="button"
        component={Link}
        to="/tasks/new"
        startIcon={<AddTaskIcon />}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        新規作成
      </Button>
    </div>
  );
};
