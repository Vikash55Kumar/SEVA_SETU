import { Admin } from "../models/admin.model.js";
import { Report } from "../models/report.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const generateReport = asyncHandler(async (req, res) => {
    const { formTitle, state, district, totalForms, pendingForms, processedForms, rejectedForms, labels, data } = req.body;

    console.log( formTitle, state, district, totalForms, pendingForms, processedForms, rejectedForms, labels, data);

    if ([ formTitle, state, district].some((field) => typeof field === "string" && field.trim() === "") ||
    [totalForms, pendingForms, processedForms, rejectedForms].some((field) => field === undefined || field === null)) {
    throw new ApiError(400, "All fields are required");
}

    const admin = await Admin.findOne().select("-password -email");

    const report = await Report.create({
        formTitle : formTitle, 
        state: state, 
        district : district,
        totalForms: totalForms, 
        pendingForms: pendingForms, 
        processedForms: processedForms, 
        rejectedForms: rejectedForms, 
        labels: labels, 
        data: data,
        admin: admin._id
    });

    if (!report) {
        throw new ApiError(500, "Something went wrong while Generating report");
    }

    return res.status(200).json(
        new ApiResponse(200, report, "Report generate successfully")
    );
});

const getReport = asyncHandler(async(req, res) => {
    const admin = await Admin.findOne().select("-password -email")

    if(!admin) {
        return res.status(404).json(new ApiError(404, "Admin with this email not found"));
    }

    const report = await Report.find().populate();

    return res.status(200).json(new ApiResponse(200, report, "Current report fetch successfully"));
});

const uploadReport = asyncHandler(async (req, res) => {

    console.log("Uploaded files:", req.files); // Debugging
  
    const avatarLocalPath = req.files?.avatar[0]?.path;

    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Image file is required2")
    }

    return res.status(200).json(
        new ApiResponse(200, avatar, "report upload successfully")
    );
});

// const getCurrentReport = asyncHandler(async(req, res) => {
//     // const report = await Report.findById(req.report._id);
    
//     return res
//     .status(200)
//     .json(new ApiResponse(200, report, "current Report fetched successfully"))
// })

export {
    generateReport,
    getReport,
    uploadReport,
    // getCurrentReport\

}