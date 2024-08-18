import nodemailer from 'nodemailer';

export const sendTicketEmail = async (userEmail, ticket) => {
    console.log(ticket.amount)
    // Configurar el transportador de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',  
        auth: {
            user: 'lucascein82@gmail.com',  
            pass: process.env.MAIL_PASSWORD,       
        },
    });

    // Configurar el contenido del correo electrónico
    const mailOptions = {
        from: 'lucascein82@gmail.com',         // Remitente
        to: userEmail,                     // Destinatario
        subject: `Ticket de Compra: ${ticket.code}`,  // Asunto del correo
        html: `
            <h1>Gracias por tu compra</h1>
            <p>Este es tu ticket de compra con el código: <strong>${ticket.code}</strong></p>
            <p>Fecha de compra: ${ticket.purchase_datetime}</p>
            <p>Total pagado: $${ticket.amount.toFixed(2)}</p>
            <h3>Productos comprados:</h3>
            <ul>
                ${ticket.products.map(item => `
                    <li>
                        ${item.product.title} - Cantidad: ${item.quantity} - Precio: $${item.product.price.toFixed(2)}
                    </li>
                `).join('')}
            </ul>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Ticket enviado por correo a ' + userEmail);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el ticket por correo electrónico');
    }
};
