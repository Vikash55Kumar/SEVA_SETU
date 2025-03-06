import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (employeeId) => {
    try {
        const employee = await Employee.findById(employeeId);
        const accessToken = employee.generateAccessToken();
        const refreshToken = employee.generateRefreshToken();

        console.log("token generated")

        employee.refreshToken = refreshToken;
        await employee.save({ validateBeforeSave: false });

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

const registerEmployee = asyncHandler(async (req, res) => {
    const { fullName, email, employeeId, phoneNumber, password, conformPassword } = req.body;

    console.log(fullName, email, employeeId, phoneNumber, password, conformPassword);

    if ([fullName, email, employeeId, phoneNumber, password, conformPassword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedEmployee = await Employee.findOne({
        $or: [{ phoneNumber }, { employeeId }]
    });

    if (existedEmployee) {
        throw new ApiError(409, "Employee with employeeId or phoneNumber already exists");
    }
  
    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Image file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Error while upload image in cloudinary")
    }

    if (!(password === conformPassword)) {
        throw new ApiError(400, "Password and Confirm password do not match");
    }

    const employee = await Employee.create({
        fullName,
        email,
        employeeId,
        password,
        avatar: avatar.url,
        phoneNumber,
        provider: 'Employee',
    });

    const createdEmployee = await Employee.findById(employee._id).select("-password -refreshToken");

    if (!createdEmployee) {
        throw new ApiError(500, "Something went wrong while registering the Employee");
    }

    return res.status(200).json(
        new ApiResponse(200, createdEmployee, "Employee registered successfully")
    );
});

const logoutEmployee = asyncHandler( async (req, res) => {
    Employee.findByIdAndUpdate(
        req.employee._id,
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
    .json(new ApiResponse(200,{},"Employee logout Successfully"))
})

async function loginEmployee(req, res) {
    const { employeeId, password } = req.body;

    try {
        const employee = await Employee.findOne({ employeeId });

        if (!employee) {
            return res.status(400).json({ message: "employee not found" });
        }

        const isPasswordValid = await employee.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const tokens = await generateAccessAndRefreshTokens(employee._id);

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

        res.json({ employee, tokens });
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
    
        const employee = await Employee.findById(decodedToken?._id)
    
        if(!employee) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== employee?.refreshToken) {
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

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, conformPassword}=req.body
    
    if(!(newPassword ===conformPassword)) {
        throw new ApiError(400, "Conform password not match")
    }
    // req.id from auth.middleware
    const employee = await Employee.findById(req.employee?._id)

    // check passward employee.mode -- custome domain
    const isPasswordCorrect= await employee.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "old password not match")
    }

    employee.password=newPassword

   await employee.save({ validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,employee, "Password changed successfull"))

})

const getCurrentEmployee = asyncHandler(async(req, res) => {
    const employee = await Employee.findById(req.employee.id);

    if (!employee) {
        return res.status(404).json(new ApiError(404, "employee not found"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200, employee, "current employee fetched successfully"))
})

const getEmployeeDetails = asyncHandler(async (req, res) => {
    const employee = await Employee.find().populate();
    
    return res.status(200).json(new ApiResponse(200, employee, "Current employee data sent successfully"));
});

const updateResourceAllocation = asyncHandler( async(req, res) => {
    const {newDivision, employeeId} = req.body
    console.log(newDivision, employeeId);

    if(!newDivision || !employeeId) {
        throw new ApiError(400, "required employeeId or newDivision")
    }

    const allocationUpdate = await Employee.findByIdAndUpdate(
        employeeId,
        { $set: { division: newDivision } }, 
        { new: true, runValidators: true } 
    ).select("-password").exec(); // Exclude password field
    
    return res
    .status(200)
    .json(new ApiResponse(200, allocationUpdate, "resource allocation updated successfully"))

})

const updateAccountDetails = asyncHandler( async(req, res) => {
    const {phoneNumber, employeeId} = req.body

    if(!phoneNumber || !employeeId) {
        throw new ApiError(400, "required employeeId or phoneNumber")
    }

    const  employee = await Employee.findByIdAndUpdate(req.employee?._id, {
        $set: {
            phoneNumber:phoneNumber,
            employeeId:employeeId
        }
    }, {new:true}

    ).select("-password")   // password not update

    return res
    .status(200)
    .json(new ApiResponse(200, employee, "phoneNumber or employeeId updated successfull"))

})

export { 
    registerEmployee,
    loginEmployee,
    logoutEmployee,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentEmployee,
    getEmployeeDetails,
    updateResourceAllocation,
    updateAccountDetails,
    googleAuth,

 };
