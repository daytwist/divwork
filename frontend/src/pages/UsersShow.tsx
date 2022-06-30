import { useState, useEffect, FC } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { User, Task, UsersShowResponse } from "../types";

const UsersShow: FC = () => {
  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);

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
      <h1>Users#Show</h1>
      <h2>{user?.name}</h2>
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
