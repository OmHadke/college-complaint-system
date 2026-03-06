import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import { getMyComplaints } from "../api/complaint";

const FILTERS = ["all", "pending", "in_progress", "resolved"];

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchComplaints = async () => {
      const { data } = await getMyComplaints();
      setComplaints(data.complaints || []);
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    if (activeFilter === "all") {
      return complaints;
    }

    return complaints.filter((item) => item.status === activeFilter);
  }, [activeFilter, complaints]);

  return (
    <AppShell title="My Complaints">
      <div className="tabs">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={activeFilter === filter ? "tab active" : "tab"}
            type="button"
          >
            {filter.replace("_", " ")}
          </button>
        ))}
      </div>

      <section className="panel">
        {filteredComplaints.length === 0 ? (
          <p className="muted">No complaints in this category.</p>
        ) : (
          filteredComplaints.map((complaint) => (
            <article key={complaint._id} className="list-item stacked">
              <div>
                <h3>{complaint.title}</h3>
                <p>{complaint.description}</p>
                <p className="muted">Category: {complaint.category}</p>
              </div>
              <span className={`status-badge ${complaint.status}`}>{complaint.status.replace("_", " ")}</span>
            </article>
          ))
        )}
      </section>
    </AppShell>
  );
}
