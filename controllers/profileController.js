const profileModel = require("../models/profileModel");

exports.createProfile = async (req, res) => {
  try {
    const existingProfile = await profileModel.findOne({
      user_id: req.user.id,
    });
    if (existingProfile)
      throw new Error("Profile already exists! Use update instead.");

    const profile = await profileModel.create({
      ...req.body,
      user_id: req.user.id,
      profile_image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      status: "Success",
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user_id: req.params.id })
      .populate("user_id");
    if (!profile) throw new Error("Profile not found");

    res.status(200).json({
      status: "Success",
      message: "Get profile by id successfully",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ status: "Fail", message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profile_image = req.file.path;
    }

    const profile = await profileModel.findOneAndUpdate(
      { user_id: req.params.id },
      updateData,
      { new: true },
    );

    res.status(200).json({
      status: "Success",
      message: "Profile updated",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findOneAndDelete({
      user_id: req.params.id,
    });
    if (!profile) throw new Error("Profile not found");

    res.status(200).json({
      status: "Success",
      message: "Profile deleted",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};
