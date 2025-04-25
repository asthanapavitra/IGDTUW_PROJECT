const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/isLoggedInStudent");
router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("Firstname must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
    body("enrollmentNo")
      .isLength({ min: 11 })
      .withMessage("Enrollment number must be atleast 11 characters long"),
    body("department")
      .isIn(["CSE", "IT", "ECE", "MAE", "CSE-AI", "AI-ML", "ECE-AI"])
      .withMessage("Invalid Department"),
    body("semester")
      .isIn(["1", "2", "3", "4", "5", "6", "7", "8"])
      .withMessage("Invalid Semester"),
    body("section").notEmpty().withMessage("Section should not be empty"),
    body("securityQuestion.question")
      .isIn([
        "What is the name of your best childhood friend?",
        "What is your favorite color?",
        "What was the name of your first school?",
        "What is your favorite food?",
        "What is your dream job?",
      ])
      .withMessage("Invalid Question"),
    body("securityQuestion.answer")
      .isLength({ min: 1 })
      .withMessage("Must not be empty"),
  ],
  userController.registerUser
);
router.post(
  "/login",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
    body("enrollmentNo")
      .isLength({ min: 11 })
      .withMessage("Enrollment number must be atleast 11 characters long"),
  ],
  userController.loginUser
);
router.get("/dashboard", isLoggedIn, (req, res) => {
  res.status(201).json({ student: req.student });
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.clearCookie("studentToken");
  res.status(200).json({ msg: "Logged out successfully" });
});

router.get(
  "/get-courses/:department/:semNo/:section",
  isLoggedIn,
  userController.getCourses
);
module.exports = router;
