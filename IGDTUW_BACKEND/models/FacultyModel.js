const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
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
  allotedDepartments:[{
    type:String,
  }],
  subjects: [{
    type:String
  }],
});

facultySchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
facultySchema.methods.comparePassword=async function(password){
  return bcrypt.compare(password,this.password);
}
facultySchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Add expiration
};

module.exports = mongoose.model("Faculty", facultySchema);
