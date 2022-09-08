import { useContext, FC, useEffect, useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task, TasksResponse } from "../types";
import { DeadlineFormat } from "../components/DeadlineFormat";
import { PriorityLabel } from "../components/PriorityLabel";

const UsersShow: FC = () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const { user, unfinishedTasks, finishedTasks } = useFetchUser(isFinished);
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>(unfinishedTasks);
  const [tabValue, setTabValue] = useState("1");
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>();

  const columns: GridColDef[] = [
    { field: "title", headerName: "タイトル", width: 200 },
    { field: "priority", headerName: "重要度", width: 100 },
    { field: "deadline", headerName: "納期", width: 150 },
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
      console.log(isFinished);
    } else {
      setIsFinished(false);
      setTasks(unfinishedTasks);
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
        })
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    if (isFinished) {
      setTasks(finishedTasks);
    } else {
      setTasks(unfinishedTasks);
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
              <Grid item>
                <Button
                  variant="contained"
                  type="button"
                  component={Link}
                  to="/tasks/new"
                >
                  新規作成
                </Button>
              </Grid>
            ) : (
              <br />
            )}
            <Button onClick={handleIsDoneUpdate}>完了にする</Button>
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
