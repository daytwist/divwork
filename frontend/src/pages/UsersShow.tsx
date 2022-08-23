import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";
import { Task, TasksResponse } from "../types";

const UsersShow: FC = () => {
  const { user, tasks: tasksData } = useFetchUser();
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleIsDoneUpdate = (id: number, index: number) => {
    const isDone = tasks[index].is_done;

    const updateOptions: AxiosRequestConfig = {
      url: `/tasks/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: { is_done: !isDone },
    };

    axiosInstance(updateOptions)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);
        setTasks(tasks.map((t, i) => (i === index ? res.data.task : t)));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="users-show-h4">
            {user?.name ? `${user.name}のタスク` : ""}
          </Typography>
        </Grid>
        {user?.id === currentUser?.id && (
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
        )}
        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {user?.id === currentUser?.id && (
                    <TableCell>
                      完了
                    </TableCell>
                  )}
                  <TableCell>タイトル</TableCell>
                  <TableCell>納期</TableCell>
                  <TableCell>重要度</TableCell>
                  <TableCell>分担作成</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks?.map((task, index) => (
                  <TableRow key={task.id}>
                    {user?.id === currentUser?.id && (
                      <TableCell>
                        <Checkbox
                          checked={task.is_done}
                          onChange={() => handleIsDoneUpdate(task.id, index)}
                          inputProps={{ "aria-label": "is_done" }}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                    </TableCell>
                    <TableCell>{task.deadline.toString()}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>
                      <Button>分担する</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersShow;
