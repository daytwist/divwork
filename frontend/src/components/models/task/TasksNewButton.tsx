import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

export const TasksNewButton = () => {
  return (
    <div>
      <Tooltip title="新規作成" placement="top" arrow>
        <IconButton
          color="primary"
          component={Link}
          to="/tasks/new"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <AddTaskIcon />
        </IconButton>
      </Tooltip>
      <Button
        variant="contained"
        component={Link}
        to="/tasks/new"
        startIcon={<AddTaskIcon />}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        新規作成
      </Button>
    </div>
  );
};
