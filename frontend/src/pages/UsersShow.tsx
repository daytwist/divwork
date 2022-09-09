import { useContext, FC, useState, SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Box,
  Button,
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
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task, TasksResponse } from "../types";
import { DeadlineFormat } from "../components/DeadlineFormat";
import { PriorityLabel } from "../components/PriorityLabel";

const UsersShow: FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const { user, unfinishedTasks, finishedTasks } = useFetchUser({
    action: "show",
    flag,
  });
  const { currentUser } = useContext(AuthContext);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(unfinishedTasks);
  const [tabValue, setTabValue] = useState("1");
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>();

  const columns: GridColDef[] = [
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
    { field: "priority", headerName: "重要度", width: 100 },
    { field: "deadline", headerName: "納期", width: 150 },
    {
      field: "division",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <Tooltip title="分担する" placement="top" arrow>
          <IconButton
            color="secondary"
            component={Link}
            to={`/tasks/${params.id}/divisions/new`}
          >
            <ConnectWithoutContactIcon />
          </IconButton>
        </Tooltip>
      ),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    priority: PriorityLabel(task.priority),
    deadline: DeadlineFormat(task.deadline),
  }));

  const handleSwitchTasks = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);

    if (newValue === "2") {
      setIsFinished(true);
      setTasks(finishedTasks);
      setSelectionModel([]);
      console.log(isFinished);
    } else {
      setIsFinished(false);
      setTasks(unfinishedTasks);
      setSelectionModel([]);
      console.log(isFinished);
    }
  };

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
        })
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    if (unfinishedTasks && !isFinished) {
      setTasks(unfinishedTasks);
    } else if (finishedTasks && isFinished) {
      setTasks(finishedTasks);
    }
  }, [unfinishedTasks, finishedTasks]);

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
                {selectionModel?.length ? (
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={handleIsDoneUpdate}
                  >
                    {isFinished ? "未了" : "完了済み"}にする
                  </Button>
                ) : null}
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
                  <Tab value="1" label="未了" />
                  <Tab value="2" label="完了済み" />
                </Tabs>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: { xs: 200, sm: 500, md: 700, lg: 900 } }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              selectionModel={selectionModel}
              onSelectionModelChange={(newSelectionModel) =>
                setSelectionModel(newSelectionModel)
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShow;
