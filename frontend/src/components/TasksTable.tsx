import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { Task, User, TasksResponse } from "../types";
import { AuthContext } from "../providers/AuthProvider";

type Props = {
  user: User | undefined;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  isFinished: boolean;
};

export const TasksTable = (props: Props) => {
  const { user, tasks, setTasks, isFinished } = props;
  const { currentUser } = useContext(AuthContext);

  const displayLabel = (value: string) => {
    switch (value) {
      case "high":
        return "高";
      case "medium":
        return "中";
      case "low":
        return "低";
      default:
        return "";
    }
  };

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 850 }} aria-label="tasks table">
        <TableHead>
          <TableRow>
            {user?.id === currentUser?.id && (
              <TableCell align="center">完了</TableCell>
            )}
            <TableCell>タイトル</TableCell>
            <TableCell>納期</TableCell>
            <TableCell align="center">重要度</TableCell>
            {!isFinished && <TableCell align="center">分担</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task, index) => (
            <TableRow key={task.id}>
              {user?.id === currentUser?.id && (
                <TableCell align="center">
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
              <TableCell>
                {format(new Date(task.deadline), "yyyy/MM/dd HH:mm")}
              </TableCell>
              <TableCell align="center">
                {displayLabel(task.priority)}
              </TableCell>
              {!isFinished && (
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/tasks/${task.id}/divisions/new`}
                  >
                    分担する
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
