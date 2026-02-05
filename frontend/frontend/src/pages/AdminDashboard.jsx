import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
  try {
    const res = await api.get("/api/admin/complaints");
    setComplaints(res.data.complaints);
   } catch (err) {
    console.error("Failed to fetch complaints", err);
   }
  };


  const updateStatus = async (id, status) => {
    await api.put(`/api/admin/complaints/${id}`, { status });
    fetchComplaints();
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Clear local user info stored in localStorage
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Complaint Dashboard</h2>

      {complaints.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>
            <b>Student:</b> {c.student?.name} ({c.student?.email})
          </p>
          <p>
            <b>Status:</b> {c.status}
          </p>

          <button disabled={c.status === "approved"} onClick={() => updateStatus(c._id, "in_progress")}>
            Approve
          </button>
          <button disabled={c.status === "resolved"} onClick={() => updateStatus(c._id, "resolved")}>
            Resolve
          </button>
        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
