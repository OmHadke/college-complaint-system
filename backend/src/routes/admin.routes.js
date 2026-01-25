const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
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
