import { Dispatch, SetStateAction, useState } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDialog } from "../../ui/AlertDialog";
import { TasksNewButton } from "../task/TasksNewButton";
import { IsDoneUpdateButton } from "../task/IsDoneUpdateButton";
import { useHandleMultiTasks } from "../../../hooks/useHandleMultiTasks";

type Props = {
  selectionModel: GridRowId[];
  isFinished: boolean;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  tabValue: number;
};

export const TasksActionButtons = (props: Props) => {
  const { selectionModel, isFinished, flag, setFlag, tabValue } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleMultiIsDoneUpdate, handleMultiTasksDelete } =
    useHandleMultiTasks({
      selectionModel,
      isFinished,
      flag,
      setFlag,
      handleClose,
    });

  return (
    <div>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <TasksNewButton />
        {tabValue === 2 || (
          <Stack direction="row" spacing={1}>
            <IsDoneUpdateButton
              onClick={handleMultiIsDoneUpdate}
              disabled={selectionModel?.length === 0}
              isFinished={isFinished}
            />
            <IconButton
              color="error"
              onClick={handleClickOpen}
              disabled={selectionModel?.length === 0}
            >
              <DeleteIcon />
            </IconButton>
            <AlertDialog
              open={open}
              handleClose={handleClose}
              objectName="タスク"
              onClick={handleMultiTasksDelete}
            />
          </Stack>
        )}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <TasksNewButton />
        {tabValue === 2 || (
          <Stack direction="row" spacing={2}>
            <IsDoneUpdateButton
              onClick={handleMultiIsDoneUpdate}
              disabled={selectionModel?.length === 0}
              isFinished={isFinished}
            />
            <Button
              color="error"
              variant="outlined"
              onClick={handleClickOpen}
              disabled={selectionModel?.length === 0}
              startIcon={<DeleteIcon />}
            >
              削除する
            </Button>
            <AlertDialog
              open={open}
              handleClose={handleClose}
              objectName="タスク"
              onClick={handleMultiTasksDelete}
            />
          </Stack>
        )}
      </Stack>
    </div>
  );
};
