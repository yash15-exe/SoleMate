import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:${file.type};base64,${bytes.toString('base64')}`,
      { folder: folder, resource_type: 'auto' },
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

export default cloudinary;
