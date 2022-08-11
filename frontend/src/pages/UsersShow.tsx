import { useState, useEffect, FC, useContext } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { User, Task, UsersShowResponse } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const UsersShow: FC = () => {
  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isSignedIn, currentUser } = useContext(AuthContext);
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/users/${params.id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<UsersShowResponse>) => {
        console.log(res);
        setUser(res.data.user);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
