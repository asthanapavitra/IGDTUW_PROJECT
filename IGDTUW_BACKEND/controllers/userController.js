const Student = require("../models/StudentModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, fullName, password, enrollmentNo, department, semester ,securityQuestion} =
      req.body;
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const newStudent = await Student.create({
      email,
      fullName,
      password,
      enrollmentNo,
      department,
      semester,
      securityQuestion
    });

    newStudent.password = await Student.hashPassword(password);
    newStudent.save();
    res.status(201).json({ newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, enrollmentNo } = req.body;
    let student = await Student.findOne({ enrollmentNo }).select("+password");
    if (!student) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    res.cookie("studentToken", token, {
      httpOnly: true,
    });
    student.password = undefined; // Exclude password from the response
    res.status(201).json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};
