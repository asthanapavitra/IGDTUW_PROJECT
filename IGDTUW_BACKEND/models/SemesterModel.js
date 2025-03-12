const mongoose = require("mongoose");
const SemesterSchema = mongoose.Schema({
  semNo: { type: Number, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});
module.exports = mongoose.model("Semester", SemesterSchema);
