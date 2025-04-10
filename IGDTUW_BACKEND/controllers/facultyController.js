const Faculty = require("../models/FacultyModel");
const { validationResult } = require("express-validator");
const upload = require("../config/multer-config");
const Book = require("../models/BookModel");
const StudyMaterial = require("../models/StudyMaterial");
const Allotment = require("../models/AllotmentModel");
const { MongoClient, GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
// Register Faculty
const registerFaculty = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, facultyId, password, department } = req.body;

    // Check if faculty with the same email or facultyId already exists
    const existingFaculty = await Faculty.findOne({
      $or: [{ email }, { facultyId }],
    });
    if (existingFaculty) {
      return res.status(400).json({
        errors: [{ message: "Faculty with this email or ID already exists" }],
      });
    }

    // Hash the password
    const hashedPassword = await Faculty.hashPassword(password);

    // Create a new faculty instance
    const newFaculty = await Faculty.create({
      fullName,
      email,
      facultyId,
      department,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Faculty registered successfully",
      faculty: newFaculty,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ message: error.message }] });
  }
};

module.exports = { registerFaculty };

module.exports.loginFaculty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, facultyId } = req.body;
    let faculty = await Faculty.findOne({ facultyId }).select("+password");
    if (!faculty) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }
    const isMatch = await faculty.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }
    const token = faculty.generateToken();
    res.cookie("facultyToken", token, {
      httpOnly: true,
    });
    faculty.password = undefined; // Exclude password from the response
    res.status(201).json({ token, faculty });
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports.getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find({})
      .select("-password")
      .populate("allotedDepartments");
    if (!faculties) {
      return res
        .status(404)
        .json({ errors: { message: "No faculties found" } });
    }
    res.status(200).json({ faculties });
  } catch (err) {
    res.status(500).json({ erros: { message: err.message } });
  }
};

module.exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .select("-password")
      .populate("allotedDepartments");
    // console.log(faculty);
    if (!faculty) {
      return res.status(404).json({ errors: { message: "Not found" } });
    }
    res.status(200).json({ faculty });
  } catch (err) {
    res.status(500).json({ erros: { message: err.message } });
  }
};

module.exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!faculty) {
      return res.status(404).json({ errors: { message: "Faculty not found" } });
    }
    res.status(200).json({ faculty });
  } catch (err) {
    res.status(500).json({ erros: { message: err.message } });
  }
};

module.exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ erros: { message: "Faculty not found" } });
    }
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ erros: { message: err.message } });
  }
};

module.exports.uploadDoc = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "uploads",
    });

    // 1. Stream file into GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: {
        uploadedBy: req.faculty?._id || "test",
      },
      contentType: req.file.mimetype,
    });
    const uploadedFileId = uploadStream.id;
    console.log(uploadedFileId);
    uploadStream.end(req.file.buffer);

    // 2. Wait for stream to finish before proceeding
    uploadStream.on("finish", async () => {
      try {
        const allotmentId = req.params.allotmentId;
        const { unit, subject, fileName } = req.body;

        console.log("Upload complete. File ID:", uploadedFileId);

        const book = await Book.create({
          fileName,
          unit: Number(unit),
          faculty:  req.faculty?._id ,
          subject,
          fileUrl: `/faculty/files/${uploadedFileId}`, // Use this!
        });
        // 4. Save to StudyMaterial
        let studyMaterial = await StudyMaterial.findOne({ unit: Number(unit) });

        if (!studyMaterial) {
          studyMaterial = await StudyMaterial.create({
            unit: Number(unit),
            file: [book._id],
          });
        } else {
          studyMaterial.file.push(book._id);
          await studyMaterial.save();
        }

        // 5. Attach to Allotment
        await Allotment.findByIdAndUpdate(allotmentId, {
          $addToSet: { materials: studyMaterial._id },
        });

        res.status(201).json({ message: "File uploaded successfully", book });
      } catch (err) {
        console.error("Post-upload processing error:", err);
        res
          .status(500)
          .json({ error: "Upload processing failed", details: err.message });
      }
    });

    uploadStream.on("error", (err) => {
      console.error("GridFS upload stream error:", err);
      res
        .status(500)
        .json({ error: "File upload failed", details: err.message });
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res
      .status(500)
      .json({ error: "Upload failed", details: err.message });
  }
};

module.exports.getPdf = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { ObjectId } = require("mongodb");
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // 🔍 Check if file exists
    const file = await db.collection("uploads.files").findOne({ _id: new ObjectId(fileId) });

    console.log(file);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // 🧾 Set headers
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `inline; filename="${file.filename}"`,
    });

    // 📥 Stream the file
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);

  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).json({ error: "Error retrieving file" });
  }
};
module.exports.downloadFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { ObjectId } = require("mongodb");
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    const file = await db.collection("uploads.files").findOne({ _id: new ObjectId(fileId) });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);
    
  } catch (err) {
    console.error("Download stream error:", err);
    res.status(500).json({ error: "Error downloading file" });
  }
};
