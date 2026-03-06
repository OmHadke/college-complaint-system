import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AppShell({ title, children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">College Complaint SaaS</p>
          <h1>{title}</h1>
        </div>

        <div className="topbar-actions">
          {user?.role === "student" && (
            <>
              <Link to="/student/dashboard">Dashboard</Link>
              <Link to="/student/complaints">My Complaints</Link>
              <Link to="/student/complaints/new">New Complaint</Link>
            </>
          )}
          {user?.role === "admin" && <Link to="/admin/dashboard">Admin Dashboard</Link>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}
