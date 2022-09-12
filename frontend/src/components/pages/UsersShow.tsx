import {
  useContext,
  FC,
  useState,
  SyntheticEvent,
  useEffect,
  useCallback,
} from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchUser } from "../../hooks/useFetchUser";
import { Task } from "../../types";
import { DatetimeFormat } from "../ui/DatetimeFormat";
import { PriorityLabel } from "../models/task/PriorityLabel";
import { TasksDeleteIconButton } from "../models/task/TasksDeleteIconButton";
import { AlertDialog } from "../ui/AlertDialog";
import { GetChipProps } from "../models/task/GetChipProps";
import { TasksNewButton } from "../models/task/TasksNewButton";
import { IsDoneUpdateButton } from "../models/task/IsDoneUpdateButton";
import { useHandleMultiTasks } from "../../hooks/useHandleMultiTasks";

const UsersShow: FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const { user, unfinishedTasks, finishedTasks } = useFetchUser({
    action: "show",
    flag,
  });
  const { currentUser } = useContext(AuthContext);
  const urlParams = useParams<{ id: string }>();
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(unfinishedTasks);
  const [tabValue, setTabValue] = useState("unfinished");
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
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

  const unfinishedColumns: GridColDef[] = [
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

  const finishedColumns: GridColDef[] = [
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

  const rows = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: PriorityLabel(task.priority),
    deadline: DatetimeFormat(task.deadline),
    rateOfProgress: `${task.rate_of_progress}%`,
    updated_at: DatetimeFormat(task.updated_at),
  }));

  const handleSwitchTasks = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      setTabValue(newValue);

      if (newValue === "unfinished") {
        setIsFinished(false);
        setTasks(unfinishedTasks);
        setColumns(unfinishedColumns);
        setSelectionModel([]);
        console.log(isFinished);
      } else {
        setIsFinished(true);
        setTasks(finishedTasks);
        setColumns(finishedColumns);
        setSelectionModel([]);
        console.log(isFinished);
      }
    },
    [tasks]
  );

  useEffect(() => {
    if (unfinishedTasks && !isFinished) {
      setTasks(unfinishedTasks);
      setColumns(unfinishedColumns);
    } else if (finishedTasks && isFinished) {
      setTasks(finishedTasks);
      setColumns(finishedColumns);
    }
  }, [unfinishedTasks, finishedTasks, urlParams]);

  useEffect(() => {
    if (urlParams) {
      setTabValue("unfinished");
      setIsFinished(false);
    }
  }, [urlParams]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="users-show-h4">
            {user?.name ? `${user.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {user?.id === currentUser?.id ? (
              <Stack direction="row" spacing={2}>
                <TasksNewButton />
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
            ) : (
              <br />
            )}
            <Grid item>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  textColor="inherit"
                  value={tabValue}
                  onChange={handleSwitchTasks}
                >
                  <Tab value="unfinished" label="未了" />
                  <Tab value="finished" label="完了済み" />
                </Tabs>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: { xs: 300, sm: 550, md: 710, lg: 974 } }}>
          <div style={{ height: 400, width: "100%" }}>
            {user?.id === currentUser?.id ? (
              <DataGrid
                rows={rows}
                columns={columns}
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
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShow;
