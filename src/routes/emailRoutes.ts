import { Router } from "express";
import { sendEmail } from "../controller/emailClass";

const router = Router();

router.post('/verification', sendEmail.sendVerificationEmail)
router.post('/confirmacion-pedido', sendEmail.sendOrderConfirmationEmail)
router.post('/recuperar-contrasena', sendEmail.sendPasswordResetEmail)

export default router