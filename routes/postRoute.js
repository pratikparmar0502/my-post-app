const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");
const postController = require("../controllers/postController");

router.post("/create", upload.single("image"), postController.createPost);
router.get("/get", postController.getAllPosts);
router.get("/get/:id", postController.getPostById);
router.delete("/delete/:id", postController.deletePost);
router.patch("/update/:id", upload.single("image"), postController.updatePost);

module.exports = router;
