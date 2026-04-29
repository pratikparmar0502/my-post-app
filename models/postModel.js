const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
