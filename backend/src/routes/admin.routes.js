const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const { getAllComplaints , updateComplaintStatus } = require("../controllers/complaint.controller");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);

router.get(
  "/complaints",
  protect,
  authorize("admin"),
  getAllComplaints
);

// THIS WAS MISSING
router.put(
  "/complaints/:id",
  protect,
  authorize("admin"),
  updateComplaintStatus
);

router.post(
  "/complaint",
  protect,
  authorize("student"),
  (req, res) => {
    res.json({ message: "Complaint submitted" });
  }
);


module.exports = router;
