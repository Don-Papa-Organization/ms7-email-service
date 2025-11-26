export class emailTemplate{
    public static generateVerificationEmailTemplate(verificationLink: string): string {
            return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { 
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .button {
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Bienvenido a Don Papa</h1>
                    <p>Gracias por registrarte. Por favor, verifica tu correo electrónico haciendo clic en el siguiente botón:</p>
                    <a href="${verificationLink}" class="button">Verificar Correo</a>
                    <p>Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:</p>
                    <p>${verificationLink}</p>
                    <p>Si no solicitaste esta verificación, puedes ignorar este correo.</p>
                </div>
            </body>
            </html>
            `;
        }
}