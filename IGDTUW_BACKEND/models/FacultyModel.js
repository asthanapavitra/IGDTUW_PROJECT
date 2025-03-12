const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const facultySchema =  mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "First name must contain atleast 3 or more characters"],
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
    minLength: [6, "Password must contain atleast 6 or more characters"],
    select: false,
  },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

facultySchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Faculty", facultySchema);
