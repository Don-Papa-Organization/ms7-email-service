import { Router } from "express";
import { sendEmail } from "../controller/emailClass";

const router = Router();

router.post('/verification', sendEmail.sendVerificationEmail)

export default router