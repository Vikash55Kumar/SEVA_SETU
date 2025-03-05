import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { getCertificateDetails, registerCertificate, updateCertificateVerificationStatus } from "../controllers/certificate.controller.js";
const router = Router();

router.route("/registrCertificate").post(upload.fields([{ name: "avatarAffidavit", maxCount: 1 }]), registerCertificate )

router.route("/updateCertificateVerification").post(upload.fields([{ name: "certificatePdf", maxCount: 1 }]), updateCertificateVerificationStatus)

router.route("/getCertificateDetails").get(getCertificateDetails)

export default router;