import axios from "axios";

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});
