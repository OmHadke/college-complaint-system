const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  getMyComplaints
} = require("../controllers/complaint.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

// Student submits complaint
router.post(
  "/",
  protect,
  authorize("student"),
  createComplaint
);

// Admin views all complaints
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllComplaints
);

// Student views own complaints
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyComplaints
);


// Admin updates complaint status
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateComplaintStatus
);



module.exports = router;
