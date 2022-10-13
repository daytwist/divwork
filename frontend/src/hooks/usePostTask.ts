import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../apis/axios";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { TaskResponse, EditTask } from "../types/taskTypes";

type Props = {
  task: EditTask | undefined;
  deadline: Date | null;
};

export const usePostTask = (props: Props) => {
  const { task, deadline } = props;
  const { currentUser, teamReloadFlag, setTeamReloadFlag } =
    useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: "/tasks",
    method: "POST",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: {
      title: task?.title,
      description: task?.description,
      deadline,
      priority: task?.priority,
      user_id: currentUser?.id,
    },
  };

  const handleCreateTask = () => {
    baseAxios(options)
      .then((res: AxiosResponse<TaskResponse>) => {
        console.log(res);
        setTeamReloadFlag(!teamReloadFlag);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "タスクを作成しました",
        });
        navigate(`/users/${currentUser?.id}`, { replace: true });
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

  return handleCreateTask;
};
