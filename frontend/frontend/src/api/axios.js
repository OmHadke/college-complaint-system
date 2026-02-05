import axios from "axios";

const api = axios.create({
  baseURL: "https://special-telegram-x5grwgw975v3rgg-5000.app.github.dev/",
  withCredentials: true, //  REQUIRED for cookies
});

api.defaults.headers.common["Accept"] = "application/json";

export default api;
