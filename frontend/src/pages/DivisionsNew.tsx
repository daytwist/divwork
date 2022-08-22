import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { divisionTask, TasksResponse, DivisionsCreateResponse } from "../types";
import { DeadlineTextField } from "../components/DeadlineTextField";
import { PriorityTextField } from "../components/PriorityTextField";

const DivisionsNew: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<divisionTask>({
    title: "",
    description: "",
    user_id: 0,
    parent_id: 0,
  });

  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>("low");
  const [comment, setComment] = useState<string>("");

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
      data: { task, division: { comment } },
    };

    axiosInstance(options)
      .then((res: AxiosResponse<DivisionsCreateResponse>) => {
        console.log(res);

        if (res.status === 200) {
          navigate(`/users/${res.data.division.user_id}`, { replace: false });
        }
      })
      .catch((err) => console.log(err));
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
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res.data);
        setTask(res.data.task);
        setDeadline(res.data.task.deadline);
        setPriority(res.data.task.priority);
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
            label="送信先ユーザー"
            variant="standard"
            name="user_id"
            onChange={handleInputChange}
          />
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
