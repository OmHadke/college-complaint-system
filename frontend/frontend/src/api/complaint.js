import api from "./axios";

// Create complaint
export const createComplaint = (data) => {
  return api.post("/api/complaints", data);
};

// Get my complaints
export const getMyComplaints = () => {
  return api.get("/api/complaints/my");
};
