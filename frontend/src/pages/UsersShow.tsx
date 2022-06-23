import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { User, Task, ShowUserResponse } from "../interfaces";
import { axiosInstance } from "../utils/axios";

const UsersShow: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/users/${params.id}`,
    method: "GET",
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<ShowUserResponse>) => {
        const { data } = res;
        console.log(data);
        console.log(params);
        setUser(data.user);
        setTasks(data.tasks);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1>Show User</h1>
      <h2>{params.id}</h2>
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
