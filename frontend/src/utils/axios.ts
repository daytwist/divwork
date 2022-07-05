import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;
