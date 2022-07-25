import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Container, TextField } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { divisionTask, TasksResponse, DivisionsCreateResponse } from "../types";

const DivisionsNew: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<divisionTask>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    is_done: false,
    user_id: 0,
    parent_id: 0,
  });

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="sm">
      <h1>タスクを分担する</h1>
      <div>
        <TextField
          label="タイトル"
          variant="standard"
          name="title"
          value={task.title}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <TextField
          label="詳細"
          variant="standard"
          multiline
          rows={3}
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div>
        <label>
          納期
          <input
            type="text"
            name="deadline"
            value={task.deadline}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          優先度
          <input
            name="priority"
            value={task.priority}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          送信先ユーザー
          <input name="user_id" onChange={handleInputChange} />
        </label>
      </div>
      <br />
      <div>
        <TextField
          label="送信コメント"
          variant="standard"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <br />
      <Button variant="contained" type="submit" onClick={handleDivisionsCreate}>
        送信
      </Button>
    </Container>
  );
};

export default DivisionsNew;
