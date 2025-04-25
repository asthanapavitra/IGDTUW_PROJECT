const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  deptName: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Department", DepartmentSchema);
