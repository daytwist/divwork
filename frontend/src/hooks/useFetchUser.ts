import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { DivisionHistory, Task, User, UsersResponse } from "../types";
import { axiosInstance } from "../utils/axios";
import { SnackbarContext } from "../providers/SnackbarProvider";

type Props = {
  action: string;
  flag: boolean | undefined;
};

export const useFetchUser = (props: Props) => {
  const { action, flag } = props;
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [unfinishedTasks, setUnfinishedTasks] = useState<Task[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
  const [divisions, setDivisions] = useState<DivisionHistory[]>([]);

  let url = "";
  if (action === "edit") {
    url = `/users/${params.id}/edit`;
  } else {
    url = `/users/${params.id}`;
  }

  const options: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<UsersResponse>) => {
        console.log(res);
        setUser(res?.data.user);
        setUnfinishedTasks(res?.data.unfinished_tasks);
        setFinishedTasks(res?.data.finished_tasks);
        setDivisions(res.data.divisions);
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: `${err.response.data.messages}`,
        });
        navigate("/teams", { replace: true });
      });
  }, [params, action, flag]);

  return { user, unfinishedTasks, finishedTasks, divisions };
};
