import { useCallback, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridRowId } from "@mui/x-data-grid";
import { AlertDialog } from "./AlertDialog";
import { useTasksDelete } from "../hooks/useTasksDelete";

type Props = {
  taskId: string | GridRowId | undefined;
};

export const TasksDeleteIconButton = (props: Props) => {
  const { taskId } = props;
  const handleTasksDelete = useTasksDelete({ taskId });
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

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
