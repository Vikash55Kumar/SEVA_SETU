import { Router } from "express";
import { generateReport, getReport, uploadReport } from "../controllers/report.controller.js";
import { verifyJWT } from "../middlewares/adminAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/generateReport").post(generateReport )

router.route("/getReport").get(verifyJWT, getReport)

router.route("/uploadReport").post(upload.fields([{ name: "avatar", maxCount: 1 }]), uploadReport)
// router.route("/getCurrentReport").get(getCurrentRepo




export default router;