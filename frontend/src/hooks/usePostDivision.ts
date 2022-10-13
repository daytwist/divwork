import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseAxios } from "../apis/axios";
import { PostDivisionResponse } from "../types/divisionTypes";
import { AuthContext } from "../providers/AuthProvider";
import { SnackbarContext } from "../providers/SnackbarProvider";
import { DivisionTask } from "../types/taskTypes";

type Props = {
  task: DivisionTask | undefined;
  deadline: Date | null;
  comment: string;
  teamMemberValue: string;
};

export const usePostDivision = (props: Props) => {
  const { task, deadline, comment, teamMemberValue } = props;
  const { teamReloadFlag, setTeamReloadFlag } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const options: AxiosRequestConfig = {
    url: `/tasks/${taskId}/divisions`,
    method: "POST",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
    data: {
      task: {
        title: task?.title,
        description: task?.description,
        priority: task?.priority,
        deadline,
        user_id: teamMemberValue ? Number(teamMemberValue) : "",
        parent_id: task?.parent_id,
      },
      division: { comment },
    },
  };

  const handleCreateDivision = () => {
    baseAxios(options)
      .then((res: AxiosResponse<PostDivisionResponse>) => {
        console.log(res);
        setTeamReloadFlag(!teamReloadFlag);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "分担タスクを作成しました",
        });
        navigate(`/users/${res.data.task.user_id}`, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          message: err.response.data.error,
        });
      });
  };

  return handleCreateDivision;
};
