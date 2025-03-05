import { Router } from "express";
import { apiFetch, changeCurrentPassword, getAdminDetails, getCurrentAdmin, loginAdmin, logoutAdmin, refreshAccessToken, registerAdmin, updateAccountDetails } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/adminAuth.middleware.js";
const router = Router();

// router.route("/register").post(upload.single("image"), registerUser)
router.route("/register").post( upload.fields([{ name: "avatar", maxCount: 1 }]), registerAdmin )

router.route("/login").post(loginAdmin)

router.route("/forgetPassword").post(verifyJWT, changeCurrentPassword)

router.route("/getAdmin").get(verifyJWT, getCurrentAdmin)

router.route("/getAdminDetails").get(getAdminDetails)
router.route("/apiFetch").post(apiFetch)

router.route("/updateAccount").patch(verifyJWT, updateAccountDetails)


// secure routers
router.route("/logout").post(verifyJWT, logoutAdmin)
router.route("/refresh-token").post(refreshAccessToken)


export default router;