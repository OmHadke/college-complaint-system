import ProtectedRoute from "./ProtectedRoute";

export default function AdminRoute({ children }) {
  return <ProtectedRoute allowRole="admin">{children}</ProtectedRoute>;
}
