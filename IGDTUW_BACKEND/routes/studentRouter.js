const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
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
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
});
module.exports = router;
