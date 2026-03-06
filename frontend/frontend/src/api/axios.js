import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://special-telegram-x5grwgw975v3rgg-5000.app.github.dev";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
