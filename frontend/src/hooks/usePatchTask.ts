import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../apis/axios";
import { TaskResponse, EditTask } from "../types/taskTypes";
import { SnackbarContext } from "../providers/SnackbarProvider";

type Props = {
  task: EditTask | undefined;
  deadline: Date | null;
};

export const usePatchTask = (props: Props) => {
  const { task, deadline } = props;
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { id: taskId } = useParams();

  const options: AxiosRequestConfig = {
    url: `/tasks/${taskId}`,
    method: "PATCH",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: {
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      deadline,
      rate_of_progress: task?.rate_of_progress,
    },
  };

  const handleUpdateTask = () => {
    baseAxios(options)
      .then((res: AxiosResponse<TaskResponse>) => {
        console.log(res);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "タスクを更新しました",
        });
        navigate(`/tasks/${taskId}`, { replace: true });
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

  return handleUpdateTask;
};
