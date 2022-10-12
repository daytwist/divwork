import { Dispatch, SetStateAction, useContext } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { User } from "../../../types/userTypes";
import { Task } from "../../../types/taskTypes";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { AuthContext } from "../../../providers/AuthProvider";
import { UnfinishedTasksColumns } from "./UnfinishedTasksColumns";
import { FinishedTasksColumns } from "./FinishedTasksColumns";

type Props = {
  isFinished: boolean;
  user: User | undefined;
  tasks: Task[] | undefined;
  selectionModel: GridRowId[];
  setSelectionModel: Dispatch<SetStateAction<GridRowId[]>>;
};

export const TasksDataGrid = (props: Props) => {
  const { isFinished, user, tasks, selectionModel, setSelectionModel } = props;
  const { currentUser } = useContext(AuthContext);
  const unfinishedTasksColumns = UnfinishedTasksColumns(user);
  const finishedTasksColumns = FinishedTasksColumns(user);

  const rows = tasks?.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    deadline: DatetimeFormat(task.deadline),
    rateOfProgress: `${task.rate_of_progress}%`,
    updated_at: DatetimeFormat(task.updated_at),
  }));

  return (
    <Box
      sx={{ height: 430, width: "100%", "& .deadline.over": { color: "red" } }}
    >
      {user?.id === currentUser?.id ? (
        <DataGrid
          rows={rows || []}
          columns={isFinished ? finishedTasksColumns : unfinishedTasksColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
        />
      ) : (
        <DataGrid
          rows={rows || []}
          columns={isFinished ? finishedTasksColumns : unfinishedTasksColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};
