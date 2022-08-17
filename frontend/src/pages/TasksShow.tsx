import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { useFetchTask } from "../hooks/useFetchTask";
import { AuthContext } from "../providers/AuthProvider";

const TasksShow: FC = () => {
  const task = useFetchTask();
  const { currentUser } = useContext(AuthContext);

  return (
    <Container maxWidth="sm">
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
          <Link
            style={{ textDecoration: "none" }}
            to={`/tasks/${task?.id}/edit`}
          >
            <Button color="secondary" type="button">
              編集
            </Button>
          </Link>
        </div>
      )}
      <br />
      <div>
        <Link
          style={{ textDecoration: "none" }}
          to={`/tasks/${task?.id}/divisions/new`}
        >
          <Button variant="contained" type="button">
            分担する
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default TasksShow;
