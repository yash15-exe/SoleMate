import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import fs from "fs"
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(filePath, options = {}) {
  const { cloudFolder = '', ...otherOptions } = options;
  console.log(filePath);
  try {
    if(filePath){
      const result = await cloudinary.uploader.upload(filePath, {
        folder: cloudFolder,
        ...otherOptions,
      });
      fs.unlinkSync(filePath)
      return result;
    }
    else{
      return Error("No File Path received")
    }
   
  } catch (error) {
    fs.unlinkSync(filePath)
    console.error("Error in uploading file to Cloudinary:", error); // Use console.error for better error visibility
    throw error;
  }
}

 