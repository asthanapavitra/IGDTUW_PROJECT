const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    fullName: {
        firstName: {
          type: String,
          required: true,
          minLength:[3,"First name must contain atleast 3 or more characters"]
        },
        lastName: {
          type: String,
        },
      },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /@igdtuw\.ac\.in$/, // Ensuring only university admins
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must contain at least 6 characters"],
    select: false, // Prevent returning password in queries
  },
}, { timestamps: true });

adminSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
adminSchema.methods.comparePassword=async function(password){
  return bcrypt.compare(password,this.password);
}
adminSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Add expiration
};

module.exports = mongoose.model("Admin", adminSchema);