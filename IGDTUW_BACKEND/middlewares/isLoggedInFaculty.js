const Faculty = require("../models/FacultyModel");
const jwt = require("jsonwebtoken");
module.exports.isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies?.facultyToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ message: "Unauthorized, login first" }] });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const faculty = await Faculty.findById(decodedToken.id);
      if (!faculty) {
        return res
          .status(401)
          .json({ errors: [{ message: "Unauthorized,login first" }] });
      }
      req.faculty = faculty;
      next();
    }
  } catch (err) {
    res.status(500).json({ errors: [{ message: err.message }] });
  }
};
