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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWI0MWNhYzU0MTk4M2FhYmM0Y2E1MiIsImlhdCI6MTc3NzAyNTUwNn0.umEggKSRoer3hkf6phPks7cUzvqvuXbqyh-MFeI3Ils
