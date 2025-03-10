const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  deptName: { type: String, required: true, unique: true },
  semesters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Semester" }],
});

module.exports = mongoose.model("Department", DepartmentSchema);
