const mongoose = require("mongoose");
const SemesterSchema = mongoose.Schema({
  semNo: { type: Number, required: true },
  departmentName: {
    type: String,
    ref: "Department",
    required: true,
    enum:["CSE","IT","ECE","MAE","CSE-AI","AI-ML","ECE-AI"]
  },
  subjects: [{type:String,required:true}],
});

module.exports = mongoose.model("Semester", SemesterSchema);
