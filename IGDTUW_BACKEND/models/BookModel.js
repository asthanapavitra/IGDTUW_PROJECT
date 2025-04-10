const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  unit: { type: Number, required: true },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  subject: {
    type:String
  },
  fileUrl: { type: String, required: true },
 
});

module.exports = mongoose.model("Book", BookSchema);
