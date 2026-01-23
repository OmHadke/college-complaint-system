const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const app = express();


// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("College Complaint System API running");
});

module.exports = app;