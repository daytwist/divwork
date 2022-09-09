import {
  useContext,
  FC,
  useState,
  SyntheticEvent,
  useEffect,
  useCallback,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Chip,
  ChipProps,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import EditIcon from "@mui/icons-material/Edit";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task, TasksResponse } from "../types";
import { DatetimeFormat } from "../components/DatetimeFormat";
import { PriorityLabel } from "../components/PriorityLabel";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { TasksDeleteIconButton } from "../components/TasksDeleteIconButton";
import { AlertDialog } from "../components/AlertDialog";

const getChipProps = (params: GridRenderCellParams): ChipProps => {
  if (params.value === "高") {
    return {
      icon: <PriorityHighIcon sx={{ width: 16, high: 16 }} />,
      label: "高",
      color: "error",
    };
  }
  if (params.value === "中") {
    return {
      icon: <WarningAmberIcon sx={{ width: 16, high: 16 }} />,
      label: "中",
      color: "warning",
    };
  }
  return {
    icon: <LowPriorityIcon sx={{ width: 16, high: 16 }} />,
    label: "低",
    color: "success",
  };
};

const UsersShow: FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const { user, unfinishedTasks, finishedTasks } = useFetchUser({
    action: "show",
    flag,
  });
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const urlParams = useParams<{ id: string }>();
  const navigate = useNavigate();
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
          {...getChipProps(params)}
        />
      ),
    },
    { field: "deadline", headerName: "納期", width: 150 },
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
          {...getChipProps(params)}
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

  const handleIsDoneUpdate = () => {
    // eslint-disable-next-line array-callback-return
    selectionModel?.map((id) => {
      const options: AxiosRequestConfig = {
        url: `/tasks/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "access-token": Cookies.get("_access_token") || "",
          client: Cookies.get("_client") || "",
          uid: Cookies.get("_uid") || "",
        },
        data: { is_done: !isFinished },
      };

      axiosInstance(options)
        .then((res: AxiosResponse<TasksResponse>) => {
          console.log(res);
          setFlag(!flag);

          if (res.status === 200) {
            handleSetSnackbar({
              open: true,
              type: "success",
              message: isFinished
                ? "タスクを未了にしました"
                : "タスクを完了済みにしました",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          handleSetSnackbar({
            open: true,
            type: "error",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            message: `${err.response.data.messages.join("。")}`,
          });
        });
    });
  };

  const handleMultiTasksDelete = () => {
    // eslint-disable-next-line array-callback-return
    selectionModel?.map((id) => {
      const options: AxiosRequestConfig = {
        url: `/tasks/${id}`,
        method: "DELETE",
        headers: {
          "access-token": Cookies.get("_access_token") || "",
          client: Cookies.get("_client") || "",
          uid: Cookies.get("_uid") || "",
        },
      };

      axiosInstance(options)
        .then((res: AxiosResponse) => {
          console.log(res);
          setFlag(!flag);

          if (res.status === 200) {
            handleSetSnackbar({
              open: true,
              type: "success",
              message: "タスクを削除しました",
            });
            handleClose();
            navigate(`/users/${currentUser?.id}`, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          handleSetSnackbar({
            open: true,
            type: "error",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            message: err.response.data.errors,
          });
        });
    });
  };

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
                <Button
                  variant="contained"
                  type="button"
                  component={Link}
                  to="/tasks/new"
                >
                  新規作成
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleIsDoneUpdate}
                  disabled={selectionModel?.length === 0}
                >
                  {isFinished ? "未了" : "完了済み"}にする
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClickOpen}
                  disabled={selectionModel?.length === 0}
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
