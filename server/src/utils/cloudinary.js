import dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { ApiError } from "../utils/ApiError.js";
dotenv.config();

// import cloudinary from "cloudinary"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


const uploadOnCloudinary = async (localFilePath) => {
    console.log("File found", localFilePath);
    
    try {
        if (!localFilePath) {
            console.log("File not found");
            return; // Stop execution if file path is not provided
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "sevasetu"
        }, );
        // file upload successful
        console.log("File is uploaded on Cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting file:", err);
        }); // remove temporary file
        console.error("Error uploading file:", error);
    }
}

const uploadRawCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
    });

    // ✅ Delete file after upload to free disk space
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicIdOfFile, resourceType) => {
    try {
        const result = await cloudinary.uploader.destroy(publicIdOfFile, {
            resource_type: resourceType
        });
        if (!result) {
            throw new ApiError(500, "Existing file could not be deleted from Cloudinary");
        }
        console.log("File is deleted on Cloudinary", result.url);
        return true; // Return true if deletion is successful
    } catch (error) {
        console.error("Error while deleting image:", error);
        return false; // Return false on error
    }
};
// const deleteFromCloudinary = async (publicIdOfFile, resourceType) => {
//     try {
//         console.log(`Attempting to delete ${resourceType} with publicId: ${publicIdOfFile}`);
//         const result = await cloudinary.uploader.destroy(publicIdOfFile, {
//             resource_type: resourceType
//         });

//         console.log("Cloudinary Deletion Result:", result.url);
//         return result
//     } catch (error) {
//         console.error("Error while deleting file from Cloudinary:", error);
//         return false;
//     }
// };


export { uploadOnCloudinary,deleteFromCloudinary, uploadRawCloudinary };

