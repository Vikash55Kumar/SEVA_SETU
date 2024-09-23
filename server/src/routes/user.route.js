import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, googleAuth, getUserDetails } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import passport from "../utils/passport.js";
const router = Router();

// router.route("/register").post(upload.single("image"), registerUser)
router.route("/register").post(
  upload.fields([
      {
          name: "avatar",
          maxCount: 1
      }, 
      {
          name: "coverImage",
          maxCount: 1
      }
  ]),
  registerUser
)

router.route("/login").post(loginUser)

router.route("/forgetPassword").post(verifyJWT, changeCurrentPassword)

router.route("/getUser").get(verifyJWT, getCurrentUser)

router.route("/getUserDetails").get(getUserDetails)

router.route("/updateAccount").patch(verifyJWT, updateAccountDetails)

router.route("/googleLogin").post(googleAuth)

// router.route("/updateAvatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

// router.route("/updateCoverImage").patch(verifyJWT, upload.single("avatar"), updateUserCoverImage)

// router.route("/channelProfile").post(getUserChannelProfile)


// secure routers
router.route("/logout").post(verifyJWT, logoutUser)
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