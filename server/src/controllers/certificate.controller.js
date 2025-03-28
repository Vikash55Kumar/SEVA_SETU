import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary, uploadRawCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Certificate } from "../models/certificate.model.js";

const registerCertificate = asyncHandler(async (req, res) => {
    const { aadharNumber, fullName, email, otrId, phoneNumber, caste, dob, motherName, fatherName, gender, religion, address, certificateType } = req.body;
    
    console.log(aadharNumber, fullName, email, otrId, phoneNumber, caste, dob, motherName, fatherName, gender, religion, address, certificateType);

    if ([aadharNumber, fullName, email, otrId, phoneNumber, caste, dob, motherName, fatherName, gender, religion, address, certificateType].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }    

    const user = await User.findOne({otrId});
    // console.log("ds", user);
    
    if (!user) {
        throw new ApiError(409, "You are not authorize user");
    }

    // const avatarAffidavitLocalPath = req.files?.avatarAffidavit[0]?.path;
    // console.log(avatarAffidavitLocalPath);
    
    // if (!avatarAffidavitLocalPath) {
    //     throw new ApiError(400, "Image file is required")
    // }

    // const avatarAffidavit = await uploadOnCloudinary(avatarAffidavitLocalPath)

    // if (!avatarAffidavit) {
    //     throw new ApiError(400, "Image file is required")
    // }

    const uploadedFiles = {}; // Object to store uploaded image URLs

    const fileFields = ["avatarAffidavit", "avatarSelfApproval"];

    for (const field of fileFields) {
        if (req.files?.[field]?.length) {
            const filePath = req.files[field][0].path;
            const uploadResponse = await uploadOnCloudinary(filePath);
            if (uploadResponse) {
                uploadedFiles[field] = uploadResponse.url;
            }
        }        
    }

    if (!uploadedFiles.avatarAffidavit) {
        throw new ApiError(400, "avatarAffidavit or avatarSelfApproval are required");
    }
    const certificate = await Certificate.create({
        aadharNumber,
        fullName,
        email,
        owner:user._id,
        caste,
        dob,
        gender, 
        motherName, 
        fatherName, 
        religion, 
        address, 
        phoneNumber,
        certificateType,
        avatar:user.avatar,
        ...uploadedFiles,
    });

    const createdUser = await certificate.save();

    user.certificate.push(createdUser._id);
    await user.save();

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "Certificate registration successfully")
    );
});

const updateCertificateVerificationStatus = asyncHandler(async(req, res) => {
    const {certificateId, certificateNumber, isVerified}=req.body
    console.log(certificateId, certificateNumber, isVerified);
    
    if(!certificateId || !certificateNumber || !isVerified) {
        throw new ApiError(400, "required isVerified or Certificate Id")
    }

    const certificate = await Certificate.findById(certificateId)

    if(!certificate) {
        throw new ApiError(400, "Certificate not found")
    }

    const certificatePdfLocalPath = req.files?.certificatePdf[0]?.path;
    console.log(certificatePdfLocalPath);
    
    if (!certificatePdfLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    const certificatePdf = await uploadRawCloudinary(certificatePdfLocalPath)
    
    if (!certificatePdf) {
        throw new ApiError(400, "failed to upload image on cloudinary")
    }

    const updateCertificate = await Certificate.findByIdAndUpdate(
        certificate._id, 
        { 
          isVerified, 
          certificateNumber,
          certificatePdf:certificatePdf.url
        }, 
        { new: true, validateBeforeSave: false }
      );
      
    return res
    .status(200)
    .json(new ApiResponse(200,updateCertificate, "Certification verification status update successfull"))

})

const getCertificateDetails = asyncHandler(async (req, res) => {
    const certificate = await Certificate.find().populate();
    return res.status(200).json(new ApiResponse(200, certificate, "Current certificate data fetch successfully"));
});

export { 
    registerCertificate,
    updateCertificateVerificationStatus,
    getCertificateDetails,
 };
