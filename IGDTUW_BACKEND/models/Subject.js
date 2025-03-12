const mongoose = require("mongoose");
const SubjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  subject_code:{
    type:String,
    required:true,
    minLength:[7,"Subject code must contain atleast 7 or more characters"],
    trim:true
  }
});

module.exports = mongoose.model("Subject", SubjectSchema);
