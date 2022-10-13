import { useContext, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../../apis/axios";
import { Task, TaskResponse } from "../../types/taskTypes";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

type Props = {
  task: Task | undefined;
  setTask: Dispatch<SetStateAction<Task | undefined>>;
};

export const usePatchTaskIsDone = (props: Props) => {
  const { task, setTask } = props;
  const { reloadTeamFlag, setReloadTeamFlag } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);

  const options: AxiosRequestConfig = {
    url: `/tasks/${task?.id}`,
    method: "PATCH",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: !task?.is_done
      ? {
          is_done: !task?.is_done,
          rate_of_progress: 100,
        }
      : {
          is_done: !task?.is_done,
        },
  };

  const handleUpdateTaskIsDone = () => {
    baseAxios(options)
      .then((res: AxiosResponse<TaskResponse>) => {
        console.log(res);
        setTask(res.data.task);
        setReloadTeamFlag(!reloadTeamFlag);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: task?.is_done
            ? "タスクを未了にしました"
            : "タスクを完了済みにしました",
        });
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

  return handleUpdateTaskIsDone;
};
