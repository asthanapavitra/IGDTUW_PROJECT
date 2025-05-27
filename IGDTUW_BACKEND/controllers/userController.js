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

    // 3. Get all faculties with their allotments for the given dept, semester, and section
    const facultyList = await Faculty.find()
      .populate({
        path: "allotedDepartments",
        match: {
          department,
          semester: semNo,
          section,
        },
        populate: {
          path: "materials",
          model: "StudyMaterial",
          populate: {
            path: "file",
            model: "Book",
            populate: {
              path: "faculty",
              model: "Faculty",
            },
          },
        },
      })
      .select("-password");

    const detailedSubjects = [];

    for (const subject of subjects) {
      // Find the faculty allotted for this subject
      const faculty = facultyList.find((fac) =>
        fac.allotedDepartments.some(
          (allotment) =>
            allotment.subject.trim().toLowerCase() ===
            subject.name.trim().toLowerCase()
        )
      );
    
      let matchingAllotment = null;
      if (faculty) {
        // Get the matching allotment
        matchingAllotment = faculty.allotedDepartments.find(
          (allotment) =>
            allotment.subject.trim().toLowerCase() ===
            subject.name.trim().toLowerCase()
        );

        // Filter the materials’ files for only those uploaded by this faculty for this subject
        for (const material of matchingAllotment.materials) {
          material.file = material.file.filter(
            (file) =>
              file.faculty._id.toString() === faculty._id.toString() &&
              file.subject.trim().toLowerCase() ===
                subject.name.trim().toLowerCase()
          );
        }
      }

      detailedSubjects.push({
        subject: subject.name,
        subject_code: subject.subject_code,
        allotments: faculty?{
          faculty:  {
                _id: faculty._id,
                fullName: faculty.fullName,
                email: faculty.email,
                facultyId: faculty.facultyId,
                department: faculty.department,
              }
            ,

          materials: matchingAllotment.materials
        }:null,
      });
    }

    return res.status(200).json({ subjects: detailedSubjects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
