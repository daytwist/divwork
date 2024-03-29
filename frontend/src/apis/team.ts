/* eslint-disable class-methods-use-this */
import Cookies from "js-cookie";
import { baseAxios } from "./axios";

class TeamApi {
  async getTeams<T>(): Promise<T> {
    const res = await baseAxios.get<T>("/teams/select");
    return res.data;
  }

  async getTeam<T>(teamId: number): Promise<T> {
    const res = await baseAxios.get<T>(`/teams/${teamId}`, {
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
    });
    return res.data;
  }
}

export const teamApi = new TeamApi();
