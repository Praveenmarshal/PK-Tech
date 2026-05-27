const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

function uploadBuffer(file, folder = "zilist") {
  const configured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
  if (!configured) {
    return Promise.resolve({ url: "", publicId: "", skipped: true });
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url, publicId: result.public_id });
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

module.exports = { uploadBuffer };

