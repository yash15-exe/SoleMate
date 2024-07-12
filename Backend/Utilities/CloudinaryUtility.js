import { v2 as cloudinary } from "cloudinary";



export const uploadToCloudinary = async (buffer, folder) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const base64String = buffer.toString('base64');

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:application/octet-stream;base64,${base64String}`,
      { folder: folder, resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error.message);
        }
        console.log("Cloudinary upload result:", result);
        resolve(result);
      }
    );
  });
};

export async function removeFromCloudinary(publicId) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error in removing file from Cloudinary:", error);
    throw error;
  }
}

export default cloudinary;
