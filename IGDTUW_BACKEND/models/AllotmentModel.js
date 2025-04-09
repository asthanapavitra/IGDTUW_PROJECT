const mongoose = require("mongoose");
const allotmentSchema = new mongoose.Schema({
  department: {
    type: String,
  },
  subject: {
    type: String,
  },
  section: { type: String },
  semester: { type: String },
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
    },
  ],
});
module.exports = mongoose.model("Allotment", allotmentSchema);
