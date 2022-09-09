import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import {
  DivisionTask,
  DivisionsCreateResponse,
  DivisionsNewResponse,
  User,
} from "../../types";
import { DeadlineTextField } from "../model/task/DeadlineTextField";
import { PriorityTextField } from "../model/task/PriorityTextField";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const DivisionsNew: FC = () => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<DivisionTask>({
    title: "",
    description: "",
    parent_id: 0,
  });

  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>("low");
  const [comment, setComment] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [teamMemberValue, setteamMemberValue] = useState<string>("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
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
          deadline,
          priority,
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
        setPriority(res.data.task.priority);
        setTeamMembers(res.data.team_members);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4" component="div">
            タスクを分担する
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="タイトル"
            variant="standard"
            sx={{ width: "30ch" }}
            name="title"
            value={task.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="詳細"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: "55ch" }}
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <DeadlineTextField
            value={deadline}
            onChange={(newValue) => {
              setDeadline(newValue);
            }}
          />
        </Grid>
        <Grid item>
          <PriorityTextField
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="送信先ユーザー"
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
        </Grid>
        <Grid item>
          <TextField
            label="送信コメント"
            variant="standard"
            sx={{ width: "50ch" }}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            data-testid="send-button"
            variant="contained"
            type="submit"
            onClick={handleDivisionsCreate}
          >
            送信
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DivisionsNew;
