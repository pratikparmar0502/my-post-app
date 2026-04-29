const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const profileModel = require("../models/profileModel");
const postModel = require("../models/postModel");
const crypto = require("crypto");

exports.register = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).json({
      status: "Success",
      message: "Registerd successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const emailVerify = await userModel.findOne({ email: req.body.email });
    if (!emailVerify) throw new Error("Invalid email");

    const passVerify = await bcrypt.compare(
      req.body.password,
      emailVerify.password,
    );
    if (!passVerify) throw new Error("Invalid password");

    const randomToken = crypto.randomBytes(32).toString("hex");
    emailVerify.token = randomToken;
    await emailVerify.save();

    res.status(201).json({
      status: "Success",
      message: "Login successfully",
      token: randomToken,
      data: emailVerify,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      status: "Success",
      message: "Get all users successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true },
    );
    if (!user) throw new Error("User not found");

    res.status(200).json({
      status: "Success",
      message: "User updated",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getUserByToken = async (req, res) => {
  try {
    const userId = req.user._id;

    const [profile, posts] = await Promise.all([
      profileModel.findOne({ user_id: userId }),
      postModel.find({ user_id: userId }),
    ]);

    res.status(200).json({
      status: "Success",
      message: "Complete data retrieved",
      data: {
        user: req.user,
        profile: profile || "No profile created yet",
        posts: posts,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error.message });
  }
};
