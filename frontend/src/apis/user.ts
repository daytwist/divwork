/* eslint-disable class-methods-use-this */
import { authConfig, baseAxios } from "./axios";

class UserApi {
  async getUser<T>(userId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/users/${userId}`, authConfig);
    return res.data;
  }

  async editUser<T>(userId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/users/${userId}/edit`, authConfig);
    return res.data;
  }
}

export const userApi = new UserApi();
