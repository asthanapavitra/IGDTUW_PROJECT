const Admin = require("../models/AdminModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Register Admin (Only One Admin Allowed)
const registerAdmin = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res
        .status(400)
        .json({
          errors: [
            { message: "Admin already exists. Only one admin allowed." },
          ],
        });
    }

    // Create admin
    const admin = new Admin({
      fullName,
      email,
      password: await Admin.hashPassword(password),
    });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ errors: [{ message: error.message }] });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }

    // Generate token
    const token = admin.generateToken();

    // Set token in cookies
    res.cookie("adminToken", token, {
      httpOnly: true,
    });

    res.status(200).json({ message: "Admin logged in successfully", token });
  } catch (error) {
    res.status(500).json({ errors: [{ message: error.message }] });
  }
};

// Admin Dashboard (Protected)
const getAdminDashboard = async (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Admin Dashboard", admin: req.admin });
};

// Admin Logout
const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken");
  res.status(200).json({ message: "Admin logged out successfully" });
};

module.exports = { registerAdmin, loginAdmin, getAdminDashboard, logoutAdmin };
