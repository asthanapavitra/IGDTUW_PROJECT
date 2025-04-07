const mongoose = require("mongoose");
const allotmentSchema = new mongoose.Schema({
  department: String,
  subject: {
    type: String,
  },
  section: String,
  semester: String,
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
    },
  ],
});
module.exports = mongoose.model("Allotment", allotmentSchema);
