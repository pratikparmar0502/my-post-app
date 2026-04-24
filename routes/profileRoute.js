const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");

const { authMiddleware } = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.post(
  "/create",
  authMiddleware,
  upload.single("profile_image"),
  profileController.createProfile,
);

router.get("/get/:id", authMiddleware, profileController.getProfileById);

router.patch(
  "/update/:id",
  authMiddleware,
  upload.single("profile_image"),
  profileController.updateProfile,
);
router.delete("/delete/:id", authMiddleware, profileController.deleteProfile);

module.exports = router;
