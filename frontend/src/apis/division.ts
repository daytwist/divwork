import Cookies from "js-cookie";
import { baseAxios } from "./axios";

class DivisionApi {
  // eslint-disable-next-line class-methods-use-this
  async getNewDivision<T>(taskId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/tasks/${taskId}/divisions/new`, {
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    });
    return res.data;
  }
}

export const divisionApi = new DivisionApi();
