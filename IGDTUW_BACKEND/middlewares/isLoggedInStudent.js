const Student = require("../models/StudentModel");
const jwt = require("jsonwebtoken");
module.exports.isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies.studentToken || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized, login first" });
    } else {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      const student = await Student.findById(decodedToken.id);
      if (!student) {
        return res.status(401).json({ msg: "Unauthorized,login first" });
      }
      req.student = student;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
