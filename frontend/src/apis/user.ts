import { authConfig, baseAxios } from "./axios";

class UserApi {
  // eslint-disable-next-line class-methods-use-this
  async getUser<T>(userId: string): Promise<T> {
    const res = await baseAxios.get<T>(`/users/${userId}`, authConfig);
    return res.data;
  }
}

export const userApi = new UserApi();
