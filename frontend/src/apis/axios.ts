import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authConfig: AxiosRequestConfig<any> = {
  headers: {
    "access-token": Cookies.get("_access_token") || "",
    client: Cookies.get("_client") || "",
    uid: Cookies.get("_uid") || "",
  },
};
