const postModel = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    if (!req.file) throw new Error("Image is required!");

    const post = await postModel.create({
      description: req.body.description,
      user_id: req.body.user_id,
      image: req.file.path,
    });

    res.status(201).json({
      status: "Success",
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user_id");
    res.status(200).json({
      status: "Success",
      message: "Get all posts successfully",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id).populate("user_id");
    if (!post) throw new Error("Post not found");
    res.status(200).json({
      status: "Success",
      message: "get post by id successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        image: req.file ? req.file.path : undefined,
      },
      { new: true },
    );
    if (!post) throw new Error("Post not found");

    res.status(200).json({
      status: "Success",
      message: "Post updated",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Post Deleted successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};
