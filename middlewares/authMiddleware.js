const userModel = require("../models/userModel");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Attach token!");

    const decoded = await userModel.findOne({ token: token });
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
