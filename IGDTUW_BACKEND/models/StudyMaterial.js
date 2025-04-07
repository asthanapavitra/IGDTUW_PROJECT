const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  file: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
