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

    public static generateOrderConfirmationEmailTemplate(data: {
        nombreCliente: string;
        numeroPedido: number;
        productos: Array<{
            idProducto: number;
            cantidad: number;
            precioUnitario: number;
            subtotal: number;
        }>;
        total: number;
        estado: string;
        direccionEntrega?: string;
        metodoPago: string;
    }): string {
        const productosHTML = data.productos.map(p => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">Producto ID: ${p.idProducto}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${p.cantidad}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${p.precioUnitario.toFixed(2)}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${p.subtotal.toFixed(2)}</td>
            </tr>
        `).join('');

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
                    background-color: #f9f9f9;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 0 0 5px 5px;
                }
                .info-box {
                    background-color: #f0f0f0;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 5px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    text-align: left;
                }
                .total {
                    font-size: 20px;
                    font-weight: bold;
                    color: #4CAF50;
                    text-align: right;
                    margin-top: 15px;
                }
                .footer {
                    text-align: center;
                    color: #666;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>¡Pedido Confirmado!</h1>
                </div>
                <div class="content">
                    <p>Hola <strong>${data.nombreCliente}</strong>,</p>
                    <p>Tu pedido ha sido registrado exitosamente. A continuación encontrarás los detalles:</p>
                    
                    <div class="info-box">
                        <p><strong>Número de Pedido:</strong> #${data.numeroPedido}</p>
                        <p><strong>Estado:</strong> ${data.estado.toUpperCase()}</p>
                        <p><strong>Método de Pago:</strong> ${data.metodoPago}</p>
                        ${data.direccionEntrega ? `<p><strong>Dirección de Entrega:</strong> ${data.direccionEntrega}</p>` : ''}
                    </div>

                    <h3>Productos y Cantidades:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th style="text-align: center;">Cantidad</th>
                                <th style="text-align: right;">Precio Unit.</th>
                                <th style="text-align: right;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productosHTML}
                        </tbody>
                    </table>

                    <div class="total">
                        Monto Total: $${data.total.toFixed(2)}
                    </div>

                    <div class="info-box">
                        <p><strong>¿Qué sigue?</strong></p>
                        <p>Puedes consultar el estado de tu pedido en cualquier momento desde tu historial de pedidos.</p>
                    </div>

                    <div class="footer">
                        <p>Gracias por tu preferencia</p>
                        <p><strong>Don Papa</strong></p>
                        <p style="font-size: 12px; color: #999;">Este es un correo automático, por favor no responder.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}