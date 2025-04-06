const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const isLoggedInAdmin = async (req, res, next) => {
  try {
    let token =
      req.cookies.adminToken || req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ message: "Unauthorized, login first" }] });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decodedToken.id);
    // console.log(admin)
    if (!admin) {
      return res
        .status(401)
        .json({ errors: [{ message: "Unauthorized, login first" }] });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};

module.exports = { isLoggedInAdmin };
