const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dvxw25je0",
  api_key: "263623485734599",
  api_secret: "2AEeyeFtpV-V5nPnoGq7dAdwt8o",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my-post-app",
    allowed_formats: ["jpg", "png", "jpeg", "avif"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
