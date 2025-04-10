const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  unit:{
    type: Number,
    required:true,
  },
  file: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
