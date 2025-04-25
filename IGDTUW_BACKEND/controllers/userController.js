const Student = require("../models/StudentModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Semester = require("../models/SemesterModel");
const Subject = require("../models/Subject");
const Allotment = require("../models/AllotmentModel");
const Faculty = require("../models/FacultyModel");
module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const {
      email,
      fullName,
      password,
      enrollmentNo,
      department,
      semester,
      section,
      securityQuestion,
    } = req.body;
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
      section,
      securityQuestion,
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

module.exports.getCourses = async (req, res) => {
  try {
    const { department, semNo, section } = req.params;

    // 1. Find the semester
    const semester = await Semester.findOne({
      departmentName: department,
      semNo: Number(semNo),
    });

    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    // 2. Get all subjects for this semester
    const subjects = await Subject.find({
      subject_code: { $in: semester.subjects },
    });

    const detailedSubjects = [];

    for (const subject of subjects) {
      // 3. Get allotments for this subject, department, semester, and section
      const allotments = await Allotment.find({
        subject: subject.name,
        department: department,
        semester: semNo,
        section: section,
      }).populate({
        path: "materials",
        populate: {
          path: "file",
          model: "Book",
        },
      });

      // 4. Get faculty for these allotments
      const facultyIds = await Faculty.find({
        allotedDepartments: { $in: allotments.map((a) => a._id) },
      }).select("-password");

      // 5. Structure allotment data with faculty and materials
      const subjectData = {
        subject: subject.name,
        subject_code: subject.subject_code,
        allotments: allotments.map((a) => ({
          section: a.section,
          faculty: facultyIds.find((f) =>
            f.allotedDepartments.some((id) => id.equals(a._id))
          ),
          materials: a.materials,
        })),
      };

      detailedSubjects.push(subjectData);
    }

    return res.status(200).json({ subjects: detailedSubjects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

