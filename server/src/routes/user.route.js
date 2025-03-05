import { Router } from "express";
import { getCurrentUser, 
    loginUser, 
    refreshAccessToken, 
    registerUser, 
    getUserDetails, 
    sendMail, 
    sendSMS, 
    updateVerificationStatus, 
    generateAadharOtp,
    verifyAadharOtp
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/userAuth.middleware.js";
const router = Router();

// router.route("/registrUser").post( upload.fields([{ name: "avatar", maxCount: 8 }]), registerUser )

router.route("/registrUser").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "avatarAdharCard", maxCount: 1 },
        { name: "avatarIncome", maxCount: 1 },
        { name: "avatarPanCard", maxCount: 1 },
        { name: "avatarCaste", maxCount: 1 },
        { name: "avatarResidential", maxCount: 1 },
        { name: "avatar10thMarksheet", maxCount: 1 },
        { name: "avatar12thMarksheet", maxCount: 1 }
    ]),
    registerUser
);

router.route("/loginUser").post(loginUser)

router.route("/updateVerification").post( updateVerificationStatus)

router.route("/getUser").get(verifyJWT, getCurrentUser)

router.route("/getUserDetails").get(getUserDetails)

router.route("/sendMail").post(sendMail)

router.route("/sendSMS").post(sendSMS)

router.route("/generateAadharOtp").post(generateAadharOtp)

router.route("/verifyAadharOtp").post(verifyAadharOtp)

router.route("/refresh-token").post(refreshAccessToken)

export default router;