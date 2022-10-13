import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridRowId } from "@mui/x-data-grid";
import { AlertDialog } from "../../ui/AlertDialog";
import { useDeleteTask } from "../../../hooks/useDeleteTask";

type Props = {
  taskId: string | GridRowId | undefined;
};

export const TasksDeleteIconButton = (props: Props) => {
  const { taskId } = props;
  const handleTasksDelete = useDeleteTask({ taskId });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="削除" placement="top" arrow>
        <IconButton onClick={handleClickOpen} data-testid="delete-button">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        objectName="タスク"
        onClick={handleTasksDelete}
      />
    </div>
  );
};
