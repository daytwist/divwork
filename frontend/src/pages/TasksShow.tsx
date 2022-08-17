import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { useFetchTask } from "../hooks/useFetchTask";
import { AuthContext } from "../providers/AuthProvider";

const TasksShow: FC = () => {
  const task = useFetchTask();
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <Container maxWidth="sm">
      {isSignedIn || <Navigate to="/sign_in" />}
      <h1>タスク詳細</h1>
      <div>
        <h2>{task?.title}</h2>
      </div>
      <div>
        <h4>詳細</h4>
        <p>{task?.description}</p>
      </div>
      <div>
        <h4>納期</h4>
        <p>{task?.deadline.toString()}</p>
      </div>
      <div>
        <h4>優先度</h4>
        <p>{task?.priority}</p>
      </div>
      <div>
        <h4>完了フラグ</h4>
        <p>{task?.is_done.toString()}</p>
      </div>
      {task?.user_id === currentUser?.id && (
        <div>
          <Button
            color="secondary"
            type="button"
            href={`/tasks/${task?.id}/edit`}
          >
            編集
          </Button>
        </div>
      )}
      <br />
      <div>
        <Button
          variant="contained"
          type="button"
          href={`/tasks/${task?.id}/divisions/new`}
        >
          分担する
        </Button>
      </div>
    </Container>
  );
};

export default TasksShow;
