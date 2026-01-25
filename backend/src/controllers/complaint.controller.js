const Complaint = require("../models/Complaint");

// Student submits complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      student: req.user.id, // comes from JWT
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: view all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      count: complaints.length,
      complaints
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "in_progress", "resolved"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Complaint status updated successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student: view own complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id
    }).sort({ createdAt: -1 });

    res.json({
      count: complaints.length,
      complaints
    });

  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
