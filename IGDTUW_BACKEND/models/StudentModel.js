const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const StudentSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  email: { type: String, required: true, match: /@igdtuw\.ac\.in$/ },
  password: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  enrollmentNo: { type: String, unique: true, required: true },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
});
StudentSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
module.exports = mongoose.model("Student", StudentSchema);
