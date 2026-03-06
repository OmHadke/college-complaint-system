import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import { getAllComplaints, updateComplaintStatus } from "../api/complaint";

const statusFlow = ["pending", "in_progress", "resolved"];

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchComplaints = async () => {
    try {
      const { data } = await getAllComplaints();
      setComplaints(data.complaints || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const metrics = useMemo(() => {
    return {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "pending").length,
      inProgress: complaints.filter((c) => c.status === "in_progress").length,
      resolved: complaints.filter((c) => c.status === "resolved").length,
    };
  }, [complaints]);

  const visibleComplaints = useMemo(() => {
    if (activeFilter === "all") {
      return complaints;
    }
    return complaints.filter((item) => item.status === activeFilter);
  }, [activeFilter, complaints]);

  const handleStatusUpdate = async (id, nextStatus) => {
    await updateComplaintStatus(id, nextStatus);
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint._id === id ? { ...complaint, status: nextStatus } : complaint
      )
    );
  };

  return (
    <AppShell title="Admin Operations Dashboard">
      <section className="stats-grid">
        <article className="stat-card">
          <p>Total</p>
          <h3>{metrics.total}</h3>
        </article>
        <article className="stat-card">
          <p>Pending</p>
          <h3>{metrics.pending}</h3>
        </article>
        <article className="stat-card">
          <p>In progress</p>
          <h3>{metrics.inProgress}</h3>
        </article>
        <article className="stat-card">
          <p>Resolved</p>
          <h3>{metrics.resolved}</h3>
        </article>
      </section>

      <div className="tabs">
        {["all", ...statusFlow].map((status) => (
          <button
            key={status}
            className={activeFilter === status ? "tab active" : "tab"}
            onClick={() => setActiveFilter(status)}
            type="button"
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>

      <section className="panel">
        {loading ? (
          <p className="muted">Loading complaint stream...</p>
        ) : visibleComplaints.length === 0 ? (
          <p className="muted">No complaints in selected status.</p>
        ) : (
          visibleComplaints.map((complaint) => {
            const next = statusFlow[statusFlow.indexOf(complaint.status) + 1];
            return (
              <article className="list-item stacked" key={complaint._id}>
                <div>
                  <h3>{complaint.title}</h3>
                  <p>{complaint.description}</p>
                  <p className="muted">
                    <strong>Student:</strong> {complaint.student?.name} ({complaint.student?.email})
                  </p>
                  <p className="muted">
                    <strong>Category:</strong> {complaint.category}
                  </p>
                </div>

                <div className="inline-actions">
                  <span className={`status-badge ${complaint.status}`}>{complaint.status.replace("_", " ")}</span>
                  {next ? (
                    <button type="button" onClick={() => handleStatusUpdate(complaint._id, next)}>
                      Mark as {next.replace("_", " ")}
                    </button>
                  ) : (
                    <button type="button" disabled>
                      Completed
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>
    </AppShell>
  );
}
