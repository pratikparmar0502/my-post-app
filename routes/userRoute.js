var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getAll", authMiddleware, userController.getAll);
router.patch("/update/:id", authMiddleware, userController.updateUser);

module.exports = router;
