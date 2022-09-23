import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import {
  DivisionTask,
  DivisionsCreateResponse,
  DivisionsNewResponse,
  User,
} from "../../types";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { TasksForm } from "../models/task/TasksForm";

const DivisionsNew: FC = () => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<DivisionTask>({
    title: "",
    description: "",
    priority: "",
    rate_of_progress: 0,
    parent_id: 0,
  });

  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [comment, setComment] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [teamMemberValue, setteamMemberValue] = useState<string>("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleDeadlineChange = (newValue: Date | null) => {
    setDeadline(newValue);
  };

  const handleDivisionsCreate = () => {
    const options: AxiosRequestConfig = {
      url: `/tasks/${params.id}/divisions`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: {
        task: {
          title: task.title,
          description: task.description,
          priority: task.priority,
          deadline,
          user_id: Number(teamMemberValue),
          parent_id: task.parent_id,
        },
        division: { comment },
      },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<DivisionsCreateResponse>) => {
        console.log(res);

        if (res.status === 200) {
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "分担タスクを送信しました",
          });
          navigate(`/users/${res.data.division.user_id}`, { replace: false });
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
  };

  const options: AxiosRequestConfig = {
    url: `/tasks/${params.id}/divisions/new`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<DivisionsNewResponse>) => {
        console.log(res.data);
        setTask(res.data.task);
        setDeadline(res.data.task.deadline);
        setTeamMembers(res.data.team_members);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid2 container direction="column" rowSpacing={4}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          タスクを分担する
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TasksForm
          action="divisionsNew"
          task={task}
          onChange={handleInputChange}
          deadline={deadline}
          onChangeDeadline={handleDeadlineChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          select
          label="分担先ユーザー"
          sx={{ width: "20ch" }}
          name="user_id"
          value={teamMemberValue}
          onChange={(event) => setteamMemberValue(event.target.value)}
        >
          {teamMembers.map((member) => (
            <MenuItem key={member.id} value={member.id.toString()}>
              {member.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          label="分担コメント"
          variant="outlined"
          sx={{ width: "50ch" }}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          data-testid="send-button"
          variant="contained"
          type="submit"
          onClick={handleDivisionsCreate}
        >
          完了
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default DivisionsNew;
