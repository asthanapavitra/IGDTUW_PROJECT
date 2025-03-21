const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const StudentSchema =  mongoose.Schema({
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
     match: /@igdtuw\.ac\.in$/ ,
     minLength:[15,"Email must contain atleast 15 or more characters"]
  },
  password: { 
    type: String,
     required: true,
     minLength:[6 ,"Password  must contain atleast 6 or more characters"],
     select:false
   },
  department: {
    type: String,
    ref: "Department",
    required: true,
    enum:["CSE","IT","ECE","MAE","CSE-AI","AI-ML","ECE-AI"]
  },
  enrollmentNo: { type: String, unique: true, required: true,
    minLength:[11,"Enrollment number must contain atleast 12 or more characters"]
   },
  semester: {
    type: String,
    required: true,
    enum:["1","2","3","4","5","6","7","8"]
  },
  securityQuestion: {
    question: {
      type: String,
      required: true,
      enum: [
        "What is the name of your best childhood friend?",
        "What is your favorite color?",
        "What was the name of your first school?",
        "What is your favorite food?",
        "What is your dream job?"
      ]
    },
    answer: {
      type: String,
      required: true,
      trim:true
    },
  }
});
StudentSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
StudentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("Student", StudentSchema);
