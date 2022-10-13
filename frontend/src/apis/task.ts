/* eslint-disable class-methods-use-this */
import Cookies from "js-cookie";
import { baseAxios } from "./axios";

class TaskApi {
  async getTask<T>(taskId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/tasks/${taskId}`, {
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    });
    return res.data;
  }

  async editTask<T>(taskId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/tasks/${taskId}/edit`, {
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    });
    return res.data;
  }
}

export const taskApi = new TaskApi();
