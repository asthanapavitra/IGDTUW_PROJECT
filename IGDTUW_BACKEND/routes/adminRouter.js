const express = require("express");
const { body } = require("express-validator");
const { registerAdmin, loginAdmin, logoutAdmin, getAdminDashboard,allotDepartment,deleteAllotment ,createSemester,addSubjectToSemester,deleteSubjectFromSemester,getSubjects} = require("../controllers/adminController");
const { isLoggedInAdmin } = require("../middlewares/isLoggedInAdmin");

const router = express.Router();

// Admin Registration Route (Ensures only ONE admin exists)
router.post(
  "/register",
  [
    body("fullName.firstName").isLength({min:3}).withMessage("Firstname must have atleast 3 characters"),
    body("email").isEmail().withMessage("Valid email is required").matches(/@igdtuw\.ac\.in$/).withMessage("Email must be from igdtuw.ac.in domain"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  registerAdmin
);

// Admin Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginAdmin
);

router.post('/allot-department/:id',isLoggedInAdmin,allotDepartment);
router.get('/delete-allotment/:facultyId/:allotmentId',isLoggedInAdmin,deleteAllotment)

// Admin Dashboard Route (Protected)
router.get("/dashboard", isLoggedInAdmin, getAdminDashboard);

// Admin Logout Route
router.get("/logout", isLoggedInAdmin, logoutAdmin);
router.post(
  "/create-semester",
  isLoggedInAdmin,
  [
    body("semNo").isInt({ min: 1 }).withMessage("Semester number must be a positive integer"),
    body("department")
      .isIn(["CSE", "IT", "ECE", "MAE", "CSE-AI", "AI-ML", "ECE-AI"])
      .withMessage("Invalid Department"),
  ],
  createSemester
);

router.post("/add-subject-to-semester/:semNo/:department",isLoggedInAdmin,addSubjectToSemester);
router.post("/delete-subject-to-semester/:semNo/:department",isLoggedInAdmin,deleteSubjectFromSemester);

module.exports = router;
