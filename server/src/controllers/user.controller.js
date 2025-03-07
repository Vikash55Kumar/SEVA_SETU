import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import twilio from "twilio"
import fs from "fs"
import sharp from "sharp"
import path from "path";
import axios from "axios";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        console.log("token generated")

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, "Something went wrong in generating refresh and access tokens");
    }
};

const googleAuth = asyncHandler(async (req, res) => {
    console.log("Received request for Google auth");
    console.log("Request body:", req.body);

    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
        console.log("Missing tokens");
        return res.status(400).json(new ApiResponse(400, null, "Tokens are required"));
    }

    try {
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedAccessToken._id);

        if (!user) {
            console.log("User not found");
            return res.status(401).json(new ApiResponse(401, null, "User not found"));
        }

        console.log('Stored Refresh Token:', user.refreshToken);

        if (user.refreshToken !== refreshToken) {
            console.log("Invalid refresh token");
            return res.status(401).json(new ApiResponse(401, null, "Invalid refresh token"));
        }

        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        user.refreshToken = newRefreshToken;
        await user.save();

        console.log("User authenticated successfully");
        return res.status(200).json(
            new ApiResponse(200, { user, accessToken: newAccessToken, refreshToken: newRefreshToken }, "User logged in successfully")
        );
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json(new ApiResponse(401, null, "Invalid tokens"));
    }
});

// const generateOtrId = (fullName, state, country, aadharNumber) => {
//     if (!fullName || !state || !country || !aadharNumber) {
//         throw new Error("Missing required fields to generate OTR");
//     }

//     // Extract initials from full name
//     const nameInitials = fullName.split(" ").map(word => word[0]).join("").toUpperCase();

//     // Get first 3 letters of state and country
//     const stateCode = state.substring(0, 3).toUpperCase();
//     const countryCode = country.substring(0, 3).toUpperCase();

//     // Take last 4 digits of Aadhaar number
//     const aadharLast4 = aadharNumber.slice(-4);

//     // Generate a 3-digit random number
//     const randomNum = Math.floor(100 + Math.random() * 900); // 100-999

//     // Combine everything to form the OTR ID
//     const otrId = `${nameInitials}${stateCode}${countryCode}${aadharLast4}${randomNum}`;

//     return otrId;
// };

const generateOtrId = (fullName, state, country, aadharNumber) => {
    if (!fullName || !state || !country || !aadharNumber) {
        throw new Error("Missing required fields to generate OTR");
    }

    // Extract initials from full name (max 3 letters)
    const nameInitials = fullName
        .split(" ")
        .map(word => word[0]) // Get first letter of each word
        .join("")
        .substring(0, 3) // Limit to 3 initials
        .toUpperCase();

    // Get first 3 letters of state and country
    const stateCode = state.substring(0, 3).toUpperCase();
    const countryCode = country.substring(0, 3).toUpperCase();

    // Take last 4 digits of Aadhaar number
    const aadharLast4 = aadharNumber.slice(-4);

    // Generate a timestamp-based unique value
    const timestamp = Date.now().toString().slice(-5); // Last 5 digits of timestamp

    // Combine everything to form the OTR ID
    const otrId = `${nameInitials}${stateCode}${countryCode}${aadharLast4}${timestamp}`;

    return otrId;
};

const registerUser = asyncHandler(async (req, res) => {
    const { aadharNumber, fullName, email, phoneNumber, caste, dob, gender, motherName, fatherName, religion, address,
        state, country, motherOtr, fatherOtr, password, confirmPassword } = req.body;
    
    console.log(aadharNumber, fullName, email, phoneNumber, caste, dob, gender, motherName, fatherName, religion, address,
        state, country, motherOtr, fatherOtr, password, confirmPassword);

    if ([aadharNumber, fullName, email, caste, dob, gender, motherName, fatherName, religion, address,
        state, country, phoneNumber, password, confirmPassword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }    
    const otrId = generateOtrId(fullName, state, country, aadharNumber)
    
    const existedUser = await User.findOne({ phoneNumber});

    // if (existedUser) {
    //     throw new ApiError(409, "User with  phoneNumber already exists");
    // }

    if (!(password === confirmPassword)) {
        throw new ApiError(400, "Password and Confirm password do not match");
    }

    // Handling multiple optional file uploads
    const uploadedFiles = {}; // Object to store uploaded image URLs

    const fileFields = ["avatar", "avatarAdharCard", "avatarIncome", "avatarPanCard", "avatarCaste", "avatarResidential", "avatar10thMarksheet", "avatar12thMarksheet"];

    for (const field of fileFields) {
        if (req.files?.[field]?.length) {
            const filePath = req.files[field][0].path;
            const uploadResponse = await uploadOnCloudinary(filePath);
            if (uploadResponse) {
                uploadedFiles[field] = uploadResponse.url;
            }
        }        
    }

    if (!uploadedFiles.avatar || !uploadedFiles.avatarAdharCard) {
        throw new ApiError(400, "Profile image (avatar) or AdharCard are required");
    }

    const user = await User.create({
        aadharNumber, 
        fullName,
        email,
        otrId,
        caste,
        dob, 
        gender, 
        motherName, 
        fatherName, 
        religion, 
        address,
        state, 
        country, 
        motherOtr, 
        fatherOtr, 
        phoneNumber,
        password,
        provider: 'User',
        ...uploadedFiles,  // Dynamically add uploaded images
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const logoutUser = asyncHandler( async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, 
        {
            new: true
        }
    )
    const options = {
        httpOnly : true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{},"User logout Successfully"))
})

async function loginUser(req, res) {
    const { otrId, password } = req.body;
    console.log(otrId, password);

    try {
        const user = await User.findOne({ otrId });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const tokens = await generateAccessAndRefreshTokens(user._id);

        // Send tokens in the response
        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true, // to prevent XSS attacks
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.json({ user, tokens });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorize request")
    }
    // decode token
    try {
        const decodedToken=jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expire or used")
        }
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json (
            new ApiResponse (200, {accessToken, refreshToken: newRefreshToken},"Access token refreshed")
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const updateVerificationStatus = asyncHandler(async(req, res) => {
    const {otrId, isVerified}=req.body

    if(!otrId || !isVerified) {
        throw new ApiError(400, "required isVerified or OTR Number")
    }

    const user = await User.findOne({otrId})

    if(!user) {
        throw new ApiError(400, "User not found")
    }

    user.isVerified=isVerified

   await user.save({ validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,user, "User verification status update successfull"))

})

const getCurrentUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user, "current user fetched successfully"))
})

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.find().populate();
    return res.status(200).json(new ApiResponse(200, user, "Current user data sent successfully"));
});

const sendMail = asyncHandler(async (req, res) => {
    const { email, fullName, certificateNumber,issueDate, certificatePath } = req.body;
    console.log(email, fullName, certificateNumber,issueDate, certificatePath);

    const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
           user: process.env.NODE_MAIL,  // Use your Seva Setu Gmail
           pass: process.env.NODE_APP_KEY,   // Use the 16-digit app password
       }
   });
   
   const mailOptions = {
        from: process.env.NODE_MAIL,
        to: email,
        subject: "Your Caste Certificate is Ready – Seva Setu Portal",
        text: `Dear ${fullName},\n\nYour Caste Certificate is attached.\n\nBest Regards,\nSeva Setu Team`,
        html: `
            <p>Dear <b>${fullName}</b>,</p>
            <p>We are pleased to inform you that your <b>Caste Certificate</b> has been successfully processed.</p>
            <p><b>Certificate Number:</b> ${certificateNumber}</p>
            <p><b>Issued Date:</b> ${issueDate}</p>
            <p>You can also download your certificate anytime by logging into <a href="https://www.sevasetu.com/login">Seva Setu</a>.</p>
            <p>Best Regards,<br><b>Seva Setu Support Team</b></p>
        `,
        attachments: [
            {
                filename: "Caste_Certificate.pdf",
                path: certificatePath,  // Path to the PDF file
                contentType: "application/pdf"
            }
        ]
    };
   // Send the email
   try {
    const info = await transporter.sendMail(mailOptions);
        return res.status(200).json(new ApiResponse(200, "Email sent successfully", info.response));
    } catch (error) {
        console.error("Error sending email:", error);
        throw new ApiError(500, "Failed to send email");
    }
});

const sendSMS = asyncHandler(async (req, res) => {
    const { phoneNumber, userName, otrId } = req.body;
    console.log(phoneNumber, userName, otrId);

    const client = new twilio(process.env.TWILIO_SMS_SID, process.env.TWILIO_SMS_AUTH_TOKEN);

    const message = `Dear ${userName}, Your Seva Setu OTR Registration Number is ${otrId}. Use this to log in. Visit: https://seva-setu.netlify.app/userLogin`;
    
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_SMS_PHONE_NUMBER,  // Your Twilio number
            to: phoneNumber        // Any phone number (No verification needed)
        });
        console.log("Message sent:", response.sid);
        return res.status(200).json(new ApiResponse(200, response, "SMS sent successfully"));
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw new ApiError(500, "Failed to send sms");
    }
});

const generateAadharOtp = asyncHandler(async (req, res) => {

    const {aadharNumber} = req.body;
    console.log("otp", aadharNumber);

    if(!aadharNumber || aadharNumber.length !== 12) {
        throw new ApiError(400, "Enter valid aadhar number");
    }

    const API_URL = `https://production.deepvue.tech/v2/ekyc/aadhaar/generate-otp?aadhaar_number=${aadharNumber}&consent=Y&purpose=ForKYC`;
  
    try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "x-api-key": process.env.DEEPVUE_API_KEY,
    //       "client-id": process.env.DEEPVUE_CLIENT_ID,
    //       "Content-Type": "application/json",
    //     },
    //   });

      const headers = {
        "x-api-key": process.env.DEEPVUE_API_KEY,
        "client-id": process.env.DEEPVUE_CLIENT_ID,
        "Content-Type": "application/json",
      };
  
      const params = new URLSearchParams({
        aadhaar_number: aadharNumber,
        consent: "Y",
        purpose: "ForKYC",
      });
  
      const response = await axios.post(`${API_URL}?${params.toString()}`, {}, {
        headers,
        timeout: 10000, // ✅ Set 10 seconds timeout
      });
  
      const data = await response.data;
      console.log("OTP Sent:", data);

      return res.status(200).json(new ApiResponse(200, data, "OTP Sent successfully"));
    //   return data; // Returns reference_id for OTP verification
    } catch (error) {
      console.error("Aadhaar OTP Generation Error:", error);
      throw new Error("Failed to generate Aadhaar OTP");
    }
});

const verifyAadharOtp = asyncHandler(async (req, res) => {
    const { otp, reference_id, phoneNumber } = req.body;

    console.log("Aadhar verify", otp, reference_id, phoneNumber);

    if (!otp || !reference_id || !phoneNumber) {
        throw new ApiError(400, "All fields are required");
    }

    const API_URL = "https://production.deepvue.tech/v2/ekyc/aadhaar/verify-otp";

    try {
        const headers = {
            "x-api-key": process.env.DEEPVUE_API_KEY,
            "client-id": process.env.DEEPVUE_CLIENT_ID,
            "Content-Type": "application/json",
        };

        const params = new URLSearchParams({
            otp,
            reference_id,
            consent: "Y", // Always "Y" as per regulations
            purpose: "ForKYC",
            phoneNumber,
            generate_pdf: "False",
        });

        const response = await axios.post(`${API_URL}?${params.toString()}`, {}, { headers });
        // console.log(response.data);

        // ✅ Return only response.data (avoid circular JSON error)
        return res.status(200).json(new ApiResponse(200, response.data, "Aadhaar OTP Verified Successfully"));
    } catch (error) {
    console.error("Aadhaar OTP Verification Error:", error.response?.data || error.message);

    if (error.response?.data?.sub_code === "SOURCE_FAILURE") {
        return res.status(503).json(new ApiResponse(503, null, "Aadhaar verification service is temporarily unavailable. Please try again later."));
    }
    return res.status(500).json(new ApiResponse(500, null, "Failed to verify Aadhaar OTP"));
}

});


const updateAccountDetails = asyncHandler( async(req, res) => {
    const {phoneNumber, otrId} = req.body

    if(!phoneNumber || !otrId) {
        throw new ApiError(400, "required employeeId or phoneNumber")
    }

    const  user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            phoneNumber:phoneNumber,
            employeeId:employeeId
        }
    }, {new:true}

    ).select("-password")   // password not update

    return res
    .status(200)
    .json(new ApiResponse(200, user, "phoneNumber or employeeId updated successfull"))

})

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateVerificationStatus,
    getCurrentUser,
    getUserDetails,
    sendMail,
    sendSMS,
    generateAadharOtp,
    verifyAadharOtp,
    updateAccountDetails,
    // updateUserAvatar,
    // updateUserCoverImage,
    // getUserChannelProfile,
    googleAuth,

 };
