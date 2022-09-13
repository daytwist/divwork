import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { Chip, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import EditIcon from "@mui/icons-material/Edit";
import { GetChipProps } from "./GetChipProps";
import { Task, User } from "../../../types";
import { PriorityLabel } from "../task/PriorityLabel";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { AuthContext } from "../../../providers/AuthProvider";
import { TasksDeleteIconButton } from "../task/TasksDeleteIconButton";

type Props = {
  isFinished: boolean;
  user: User | undefined;
  tasks: Task[];
  selectionModel: GridRowId[];
  setSelectionModel: Dispatch<SetStateAction<GridRowId[]>>;
};

export const TasksDataGrid = (props: Props) => {
  const { isFinished, user, tasks, selectionModel, setSelectionModel } = props;
  const { currentUser } = useContext(AuthContext);

  const rows = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: PriorityLabel(task.priority),
    deadline: DatetimeFormat(task.deadline),
    rateOfProgress: `${task.rate_of_progress}%`,
    updated_at: DatetimeFormat(task.updated_at),
  }));

  const unfinishedTasksColumns: GridColDef[] = [
    {
      field: "title",
      headerName: "タイトル",
      width: 200,
      renderCell: (params) => (
        <Link to={`/tasks/${params.id}`} style={{ color: "black" }}>
          {params.value}
        </Link>
      ),
    },
    { field: "description", headerName: "詳細", width: 200 },
    {
      field: "priority",
      headerName: "重要度",
      width: 100,
      renderCell: (params) => (
        <Chip
          variant="outlined"
          sx={{ height: 28 }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...GetChipProps(params)}
        />
      ),
    },
    { field: "deadline", headerName: "納期", width: 150 },
    { field: "rateOfProgress", headerName: "進捗率", width: 100 },
    {
      field: "actions",
      headerName: "",
      width: 150,
      renderCell: (params) =>
        user?.id === currentUser?.id ? (
          <Stack direction="row" spacing={1}>
            <Tooltip title="分担する" placement="top" arrow>
              <IconButton
                color="secondary"
                component={Link}
                to={`/tasks/${params.id}/divisions/new`}
              >
                <ConnectWithoutContactIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="編集" placement="top" arrow>
              <IconButton component={Link} to={`/tasks/${params.id}/edit`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <TasksDeleteIconButton taskId={params.id} />
          </Stack>
        ) : null,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  const finishedTasksColumns: GridColDef[] = [
    {
      field: "title",
      headerName: "タイトル",
      width: 200,
      renderCell: (params) => (
        <Link to={`/tasks/${params.id}`} style={{ color: "black" }}>
          {params.value}
        </Link>
      ),
    },
    { field: "description", headerName: "詳細", width: 200 },
    {
      field: "priority",
      headerName: "重要度",
      width: 100,
      renderCell: (params) => (
        <Chip
          variant="outlined"
          sx={{ height: 28 }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...GetChipProps(params)}
        />
      ),
    },
    { field: "deadline", headerName: "納期", width: 150 },
    { field: "updated_at", headerName: "完了日", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) =>
        user?.id === currentUser?.id ? (
          <Stack direction="row" spacing={1}>
            <Tooltip title="編集" placement="top" arrow>
              <IconButton component={Link} to={`/tasks/${params.id}/edit`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <TasksDeleteIconButton taskId={params.id} />
          </Stack>
        ) : null,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div style={{ height: 430, width: "100%" }}>
      {user?.id === currentUser?.id ? (
        <DataGrid
          rows={rows}
          columns={isFinished ? finishedTasksColumns : unfinishedTasksColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
          initialState={{
            sorting: {
              sortModel: [
                isFinished
                  ? { field: "updated_at", sort: "desc" }
                  : { field: "deadline", sort: "asc" },
              ],
            },
          }}
        />
      ) : (
        <DataGrid
          rows={rows}
          columns={isFinished ? finishedTasksColumns : unfinishedTasksColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [
                isFinished
                  ? { field: "updated_at", sort: "desc" }
                  : { field: "deadline", sort: "asc" },
              ],
            },
          }}
        />
      )}
    </div>
  );
};
