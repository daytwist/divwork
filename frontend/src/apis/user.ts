import Cookies from "js-cookie";
import { baseAxios } from "./axios";

class UserApi {
  // eslint-disable-next-line class-methods-use-this
  async getUser<T>(userId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/users/${userId}`, {
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    });
    return res.data;
  }
}

export const userApi = new UserApi();
