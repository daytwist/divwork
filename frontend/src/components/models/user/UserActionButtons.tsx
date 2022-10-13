import { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { TasksNewButton } from "../task/TasksNewButton";
import { UpdateIsDoneButton } from "../task/UpdateIsDoneButton";
import { DeleteTasksButton } from "../task/DeleteTasksButton";
import { usePatchTasksIsDone } from "../../../hooks/task/usePatchTasksIsDone";

type Props = {
  selectionModel: GridRowId[];
  isFinished: boolean;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  tabValue: number;
};

export const UserActionButtons = (props: Props) => {
  const { selectionModel, isFinished, flag, setFlag, tabValue } = props;

  const handleUpdateIsDoneTasks = usePatchTasksIsDone({
    selectionModel,
    isFinished,
    flag,
    setFlag,
  });

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <TasksNewButton />
        {tabValue === 2 ? null : (
          <Stack direction="row" spacing={1}>
            <UpdateIsDoneButton
              onClick={handleUpdateIsDoneTasks}
              disabled={selectionModel?.length === 0}
              isFinished={isFinished}
            />
            <DeleteTasksButton
              selectionModel={selectionModel}
              isFinished={isFinished}
              flag={flag}
              setFlag={setFlag}
            />
          </Stack>
        )}
      </Stack>
    </div>
  );
};
