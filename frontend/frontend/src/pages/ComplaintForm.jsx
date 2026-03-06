import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { createComplaint } from "../api/complaint";

const categoryOptions = [
  { label: "Academics", value: "academics" },
  { label: "Hostel", value: "hostel" },
  { label: "Fees", value: "fees" },
  { label: "Other", value: "other" },
];

export default function ComplaintForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: "academics" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      await createComplaint(form);
      navigate("/student/complaints");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell title="Submit a Complaint">
      <section className="panel">
        <form className="form-grid" onSubmit={handleSubmit}>
          {message && <p className="error-message">{message}</p>}

          <label>
            Complaint title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Delay in lab equipment maintenance"
              required
            />
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              {categoryOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the issue with context and urgency..."
              required
            />
          </label>

          <button disabled={submitting} type="submit">
            {submitting ? "Submitting..." : "Submit complaint"}
          </button>
        </form>
      </section>
    </AppShell>
  );
}
