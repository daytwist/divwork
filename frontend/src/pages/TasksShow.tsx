import { FC } from "react";
import { Link } from "react-router-dom";
import { useFetchTask } from "../hooks/useFetchTask";

const TasksShow: FC = () => {
  const task = useFetchTask();

  return (
    <div>
      <h1>Tasks#Show</h1>
      <h2>{task?.title}</h2>
      <h3>{task?.description}</h3>
      <div>
        <Link to={`/tasks/${task?.id}/divisions/new`}>
          <button type="button">分担する</button>
        </Link>
      </div>
    </div>
  );
};

export default TasksShow;
