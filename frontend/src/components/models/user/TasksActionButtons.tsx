import { Dispatch, SetStateAction, useState } from "react";
import { Stack } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { TasksNewButton } from "../task/TasksNewButton";
import { IsDoneUpdateButton } from "../task/IsDoneUpdateButton";
import { useHandleMultiTasks } from "../../../hooks/useHandleMultiTasks";
import { DeleteTasksButton } from "../task/DeleteTasksButton";

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

  const handleOpen = () => {
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
      <Stack direction="row" spacing={1}>
        <TasksNewButton />
        {tabValue === 2 ? null : (
          <Stack direction="row" spacing={1}>
            <IsDoneUpdateButton
              onClick={handleMultiIsDoneUpdate}
              disabled={selectionModel?.length === 0}
              isFinished={isFinished}
            />
            <DeleteTasksButton
              handleOpen={handleOpen}
              handleClose={handleClose}
              disabled={selectionModel?.length === 0}
              open={open}
              onClick={handleMultiTasksDelete}
            />
          </Stack>
        )}
      </Stack>
    </div>
  );
};
