import { authConfig, baseAxios } from "./axios";

class TeamApi {
  // eslint-disable-next-line class-methods-use-this
  async getTeam<T>(teamId: number): Promise<T> {
    const res = await baseAxios.get<T>(`/teams/${teamId}`, authConfig);
    return res.data;
  }
}

export const teamApi = new TeamApi();
