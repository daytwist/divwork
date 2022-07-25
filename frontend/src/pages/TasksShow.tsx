import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { useFetchTask } from "../hooks/useFetchTask";
import { AuthContext } from "../providers/AuthProvider";

const TasksShow: FC = () => {
  const task = useFetchTask();
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Tasks#Show</h1>
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
          <Link to={`/tasks/${task?.id}/edit`}>
            <button type="button">編集</button>
          </Link>
        </div>
      )}
      <br />
      <div>
        <Link to={`/tasks/${task?.id}/divisions/new`}>
          <button type="button">分担する</button>
        </Link>
      </div>
    </div>
  );
};

export default TasksShow;
