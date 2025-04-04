const Faculty = require("../models/FacultyModel");
const { validationResult } = require("express-validator");

// Register Faculty
const registerFaculty = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, facultyId, password ,department} = req.body;

    // Check if faculty with the same email or facultyId already exists
    const existingFaculty = await Faculty.findOne({ $or: [{ email }, { facultyId }] });
    if (existingFaculty) {
      return res.status(400).json({errors: [{message: "Faculty with this email or ID already exists"}] });
    }

    // Hash the password
    const hashedPassword = await Faculty.hashPassword(password);

    // Create a new faculty instance
    const newFaculty = await Faculty.create({
      fullName,
      email,
      facultyId,
      department,
      password: hashedPassword
    });

    res.status(201).json({ message: "Faculty registered successfully", faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ errors:[{message: error.message }]});
  }
};

module.exports = { registerFaculty };

module.exports.loginFaculty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, facultyId} = req.body;
    let faculty= await Faculty.findOne({ facultyId }).select("+password");
    if (!faculty) {
      return res.status(400).json({ errors: [{ message: "Invalid credentials" }] });
    }
    const isMatch = await faculty.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    }
    const token = faculty.generateToken();
    res.cookie("facultyToken", token, {
      httpOnly: true,
    });
    faculty.password = undefined; // Exclude password from the response
    res.status(201).json({ token, faculty });
  } catch (err) {
    res.status(500).json({errors: [{message:err.message }]});
  }
  
};
