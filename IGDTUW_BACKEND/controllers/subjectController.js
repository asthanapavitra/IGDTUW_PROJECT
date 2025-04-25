const { validationResult } = require("express-validator");
const Subject = require("../models/Subject");
const Semester = require("../models/SemesterModel");
const Department = require("../models/DepartmentModel");
const Allotment = require('../models/AllotmentModel');
module.exports.createSubject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, subject_code } = req.body;
    const subject = await Subject.create({
      name: name,
      subject_code: subject_code,
    });
    return res
      .status(200)
      .json({ message: "Subject created successfully", subject });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getSubjects = async (req, res) => {
  try {
    const { department, semNo } = req.params;

    // Find the semester document
    const semester = await Semester.findOne({
      departmentName: department,
      semNo: Number(semNo),
    });

    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    // Fetch subject details using subject codes
    const subjects = await Subject.find({
      subject_code: { $in: semester.subjects },
    });

    return res.status(200).json({ subjects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ subjects });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ departments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
