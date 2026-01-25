const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["hostel", "academics", "fees", "other"],
      default: "other"
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending"
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
