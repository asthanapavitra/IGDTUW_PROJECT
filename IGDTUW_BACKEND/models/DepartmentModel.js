const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  deptName: { type: String, required: true, unique: true, trim: true },
  semesters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Semester" }],
  
});

module.exports = mongoose.model("Department", DepartmentSchema);
