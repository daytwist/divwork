import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task, TasksResponse } from "../types";
import { axiosInstance } from "../utils/axios";

export const useFetchTask = () => {
  const [data, setData] = useState<Task>();
  const params = useParams<{ id: string }>();

  const options: AxiosRequestConfig = {
    url: `/tasks/${params.id}`,
    method: "GET",
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      client: Cookies.get("_client") || "",
      uid: Cookies.get("_uid") || "",
    },
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TasksResponse>) => {
        console.log(res);
        setData(res?.data.task);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return data;
};
