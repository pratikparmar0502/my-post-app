const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");

const postController = require("../controllers/postController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post(
  "/create",
  authMiddleware,
  upload.array("images", 3),
  postController.createPost,
);
router.get("/get", authMiddleware, postController.getAllPosts);
router.get("/get/:id", authMiddleware, postController.getPostById);
router.delete("/delete/:id", authMiddleware, postController.deletePost);
router.patch(
  "/update/:id",
  authMiddleware,
  upload.array("images", 3),
  postController.updatePost,
);

module.exports = router;
