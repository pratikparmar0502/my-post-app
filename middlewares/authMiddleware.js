const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Attach token!");

    const decoded = jwt.verify(token, "SECRET_KEY");
    if (!decoded) throw new Error("Invalid token!");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: "Fail",
      message: error.message,
    });
  }
};
