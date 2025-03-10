const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const facultySchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
  },
  email: {
    type: String,
    match: /@igdtuw\.ac\.in$/,
    required: true,
    unique: true,
    trim: true,
  },
  facultyId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

facultySchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Faculty", facultySchema);
