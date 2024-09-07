// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"

// export const verifyJWT = asyncHandler(async (req, _, next) => {
//     try {
//         const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request");
//         }

//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//         const user = await User.findById(decodedToken._id).select("-password -refreshToken");

//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token");
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(400, "Invalid Token");
//     }
// });



import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Get the token from cookies or Authorization header
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        // If no token is provided, throw an unauthorized error
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by the decoded ID and exclude sensitive fields
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        // If user not found, throw an unauthorized error
        if (!user) {
            throw new ApiError(401, "Unauthorized request: Invalid token");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // Check if the error is specifically due to JWT expiration
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Unauthorized request: Token has expired");
        } else if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Unauthorized request: Invalid token");
        } else {
            // General error handling
            throw new ApiError(401, "Unauthorized request: Failed to authenticate token");
        }
    }
});
