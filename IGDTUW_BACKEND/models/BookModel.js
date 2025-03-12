const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: Number, required: true },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  fileUrl: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
});

module.exports = mongoose.model("Book", BookSchema);
