import { Request, Response } from "express";
import * as nodemailer from "nodemailer";
import { EmailValidations } from "../utils/validations";
import { emailTemplate } from "../utils/templates";


interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true, // Usar SSL/TLS
    auth: {
        user: "clientservicedp03@gmail.com",
        pass: "jtub tneu jbsd uyrl",
    },
    tls: {
        rejectUnauthorized: false // Permite certificados autofirmados en desarrollo
    }
});

class SendEmail{
    private readonly fromEmail = "Don Papa <clientservicedp03@gmail.com>";
    private readonly baseUrl = process.env.BASE_URL || "http://localhost:4000/users";
    
    sendVerificationEmail = async (req: Request, res: Response): Promise<void> => {
        
        try {
            const { email, token } = req.body;

            if (!email || !token) {
                res.status(400).json({ message: "Email y token son requeridos" });
                return;
            }

            if (!EmailValidations.validateEmail(email)) {
                res.status(400).json({ message: "Formato de correo inválido" });
                return;
            }

            const verificationLink = `${this.baseUrl}/verify-email?token=${token}`;
            const mailOptions: EmailOptions = {
                to: email,
                subject: "Verificación de correo Don Papa",
                html: emailTemplate.generateVerificationEmailTemplate(verificationLink)
            };

            const info = await transporter.sendMail({
                ...mailOptions,
                from: this.fromEmail
            });

            console.log(verificationLink)
            res.status(200).json({ 
                success: true,
                messageId: info.messageId,
                message: "Email de verificación enviado correctamente"
            });
        } catch (error) {
            console.error('Error al enviar email:', error);
            res.status(500).json({ 
                success: false,
                message: "Error al enviar email",
                error: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }
}

export const sendEmail = new SendEmail()
