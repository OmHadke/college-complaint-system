import api from "./axios";

export const createComplaint = (payload) => api.post("/api/complaints", payload);

export const getMyComplaints = () => api.get("/api/complaints/my");

export const getAllComplaints = () => api.get("/api/admin/complaints");

export const updateComplaintStatus = (id, status) =>
  api.put(`/api/admin/complaints/${id}`, { status });
