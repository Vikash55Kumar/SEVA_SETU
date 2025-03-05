import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import axios from "axios"

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        console.log("token generated")

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, "Something went wrong in generating refresh and access tokens");
    }
};

// const googleAuth = asyncHandler(async (req, res) => {
//     console.log("Received request for Google auth");
//     console.log("Request body:", req.body);

//     const { accessToken, refreshToken } = req.body;

//     if (!accessToken || !refreshToken) {
//         console.log("Missing tokens");
//         return res.status(400).json(new ApiResponse(400, null, "Tokens are required"));
//     }

//     try {
//         const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//         const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//         const user = await User.findById(decodedAccessToken._id);

//         if (!user) {
//             console.log("User not found");
//             return res.status(401).json(new ApiResponse(401, null, "User not found"));
//         }

//         console.log('Stored Refresh Token:', user.refreshToken);

//         if (user.refreshToken !== refreshToken) {
//             console.log("Invalid refresh token");
//             return res.status(401).json(new ApiResponse(401, null, "Invalid refresh token"));
//         }

//         const newAccessToken = user.generateAccessToken();
//         const newRefreshToken = user.generateRefreshToken();

//         user.refreshToken = newRefreshToken;
//         await user.save();

//         console.log("User authenticated successfully");
//         return res.status(200).json(
//             new ApiResponse(200, { user, accessToken: newAccessToken, refreshToken: newRefreshToken }, "User logged in successfully")
//         );
//     } catch (error) {
//         console.error('Token verification error:', error);
//         return res.status(401).json(new ApiResponse(401, null, "Invalid tokens"));
//     }
// });


const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, email, officerId, password, conformPassword } = req.body;

    console.log(fullName, email, officerId, password, conformPassword);

    if ([fullName, email, officerId, password, conformPassword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedAdmin = await Admin.findOne({
        $or: [ { email, officerId }]
    });

    if (existedAdmin) {
        throw new ApiError(409, "Admin with officerId or phoneNumber already exists");
    }
  
    const avatarLocalPath = req.files?.avatar[0]?.path;

    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Image file is required")
    }

    if (!(password === conformPassword)) {
        throw new ApiError(400, "Password and Confirm password do not match");
    }

    const admin = await Admin.create({
        fullName,
        email,
        officerId,
        password,
        avatar: avatar.url,
        provider: 'Officer',
    });

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while registering the Admin");
    }

    return res.status(200).json(
        new ApiResponse(200, createdAdmin, "Admin registered successfully")
    );
});

const logoutAdmin = asyncHandler( async (req, res) => {
    Admin.findByIdAndUpdate(
        req.admin._id,
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
    .json(new ApiResponse(200,{},"Admin logout Successfully"))
})

const loginAdmin = asyncHandler( async(req, res) => {
    const { officerId, password } = req.body;

    try {
        const admin = await Admin.findOne({ officerId });

        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const isPasswordValid = await admin.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const tokens = await generateAccessAndRefreshTokens(admin._id);

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

        res.json({ admin, tokens });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorize request")
    }
    // decode token
    try {
        const decodedToken=jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const admin = await Admin.findById(decodedToken?._id)
    
        if(!admin) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== admin?.refreshToken) {
            throw new ApiError(401, "Refresh token is expire or used")
        }
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(admin._id)
    
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

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, conformPassword}=req.body
    
    if(!(newPassword ===conformPassword)) {
        throw new ApiError(400, "Conform password not match")
    }
    // req.id from auth.middleware
    const admin = await Admin.findById(req.admin?._id)

    // check passward admin.mode -- custome domain
    const isPasswordCorrect= await admin.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "old password not match")
    }

    admin.password=newPassword

   await admin.save({ validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,admin, "Password changed successfull"))

})

const getCurrentAdmin = asyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.admin.id);
    return res
    .status(200)
    .json(new ApiResponse(200, admin, "current admin fetched successfully"))
})

const getAdminDetails = asyncHandler(async (req, res) => {
    const admin = await Admin.findOne().select("-password -officerId");
    
    if (!admin) {
        return res.status(404).json(new ApiError(404, "admin not found"));
    }
    
    return res.status(200).json(new ApiResponse(200, admin, "Current admin data sent successfully"));
});


const apiFetch = asyncHandler(async (req, res) => {
    const { aadhaar_number, consent } = req.body; // Expect these values from the client
  
    const options = {
      method: 'POST',
      url: 'https://api.gridlines.io/irdai-api/insurance-agent/fetch-by-aadhaar',
      headers: {
        'X-Auth-Type': 'API-Key',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': process.env.GRIDLINES_API_KEY || 'MV73n95kBCEYMHXsabw2xv7yjTyCDU59'
      },
      data: { aadhaar_number: aadhaar_number || '973091049172', consent: consent || 'Y' }
    };
  
    try {
      const { data } = await axios.request(options);
      // Return the API response to the client
      res.json(data);
    } catch (error) {
      console.error('Error fetching agent details:', error);
      res.status(500).json({ error: error.message });
    }
  });

const updateAccountDetails = asyncHandler( async(req, res) => {
    const {phoneNumber, officerId} = req.body

    if(!phoneNumber || !officerId) {
        throw new ApiError(400, "required officerId or phoneNumber")
    }

    const  admin = await Admin.findByIdAndUpdate(req.admin?._id, {
        $set: {
            phoneNumber:phoneNumber,
            officerId:officerId
        }
    }, {new:true}

    ).select("-password")   // password not update

    return res
    .status(200)
    .json(new ApiResponse(200, admin, "phoneNumber or officerId updated successfull"))

})

export { 
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    getAdminDetails,
    updateAccountDetails,
    apiFetch
 };
