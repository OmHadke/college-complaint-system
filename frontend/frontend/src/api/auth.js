import api from "./axios";

export const logout = () => {
  return api.post("/api/auth/logout");
};
