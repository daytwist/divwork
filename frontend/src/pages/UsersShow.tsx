import { FC, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useFetchUser } from "../hooks/useFetchUser";

const UsersShow: FC = () => {
  const { user, tasks } = useFetchUser();
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <div>
      {isSignedIn || <Navigate to="/sign_in" />}
      <h1>Users#Show</h1>
      <h2>{user?.name}</h2>
      {user?.id === currentUser?.id && (
        <div>
          <Link to="/tasks/new">
            <button type="button">新規作成</button>
          </Link>
        </div>
      )}
      <div>
        <ul>
          {tasks?.map((task) => (
            <Link to={`/tasks/${task.id}`} key={task.id}>
              <li>{task.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersShow;
