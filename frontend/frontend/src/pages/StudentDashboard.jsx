import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import { getMyComplaints } from "../api/complaint";
import { useAuth } from "../hooks/useAuth";

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMyComplaints();
        setComplaints(data.complaints || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((item) => item.status === "pending").length;
    const inProgress = complaints.filter((item) => item.status === "in_progress").length;
    const resolved = complaints.filter((item) => item.status === "resolved").length;
    return { total, pending, inProgress, resolved };
  }, [complaints]);

  return (
    <AppShell title="Student Workspace">
      <p className="muted">Welcome, {user?.name}. Here is your complaint tracker summary.</p>

      <section className="stats-grid">
        <article className="stat-card">
          <p>Total complaints</p>
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

      <section className="panel">
        <div className="panel-header">
          <h2>Recent complaints</h2>
          <Link to="/student/complaints/new">+ New complaint</Link>
        </div>
        {loading ? (
          <p className="muted">Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="muted">No complaints yet. Start by submitting your first one.</p>
        ) : (
          <div className="list">
            {complaints.slice(0, 5).map((complaint) => (
              <article key={complaint._id} className="list-item">
                <div>
                  <h4>{complaint.title}</h4>
                  <p className="muted">{complaint.category}</p>
                </div>
                <span className={`status-badge ${complaint.status}`}>{statusLabels[complaint.status]}</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
