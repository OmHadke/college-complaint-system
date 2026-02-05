import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;



