import { Router } from "express";
import { changeCurrentPassword, refreshAccessToken, updateAccountDetails, googleAuth, registerEmployee, loginEmployee, getCurrentEmployee, getEmployeeDetails, logoutEmployee, updateResourceAllocation } from "../controllers/employee.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/employeeAuth.middleware.js";
import passport from "../utils/passport.js";
const router = Router();


router.route("/register").post( upload.fields([{ name: "avatar", maxCount: 1 }]), registerEmployee )

router.route("/login").post(loginEmployee)

router.route("/forgetPassword").post(verifyJWT, changeCurrentPassword)

router.route("/getUser").get(verifyJWT, getCurrentEmployee)

router.route("/getUserDetails").get(getEmployeeDetails)

router.route("/updateResource").post(updateResourceAllocation)

router.route("/updateAccount").patch(verifyJWT, updateAccountDetails)

router.route("/googleLogin").post(googleAuth)


// secure routers
router.route("/logout").post(verifyJWT, logoutEmployee)
router.route("/refresh-token").post(refreshAccessToken)


//Google Authenticaton Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.CORES_ORIGIN}/login` }), 
  async (req, res) => {

    const user = req.user;

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.redirect(`${process.env.CORES_ORIGIN}/google-login?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }
);


export default router;