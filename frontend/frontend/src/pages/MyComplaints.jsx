import { useEffect, useState } from "react";
import { getMyComplaints } from "../api/complaint";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await getMyComplaints();
        setComplaints(res.data.complaints);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>My Complaints</h2>

      {complaints.length === 0 && <p>No complaints yet</p>}

      {complaints.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>Category: {c.category}</p>
          <p>Status: {c.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyComplaints;
