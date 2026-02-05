import { useState } from "react";
import { createComplaint } from "../api/complaint";

const ComplaintForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "other",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComplaint(form);
      setMessage("Complaint submitted successfully");
      setForm({ title: "", description: "", category: "other" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h2>Submit Complaint</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="academic">Academic</option>
          <option value="hostel">Hostel</option>
          <option value="faculty">Faculty</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
