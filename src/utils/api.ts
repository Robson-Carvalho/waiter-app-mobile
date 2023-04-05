import axios from "axios";

export const api = axios.create({
  baseURL: "https://waiter-app-api.vercel.app",
});
