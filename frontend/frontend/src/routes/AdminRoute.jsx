import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    api
      .get("/api/auth/me") // protected route
      .then((res) => {
        if (res.data.role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking access...</p>;

  if (!isAdmin) return <Navigate to="/login" replace />;

  return children;
}
