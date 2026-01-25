const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.middleware");
require("dotenv").config();

const { protect } = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const complaintRoutes = require("./routes/complaint.routes");

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("College Complaint System API running");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

app.use("/api/complaints", complaintRoutes);
app.use(errorHandler);

module.exports = app;
