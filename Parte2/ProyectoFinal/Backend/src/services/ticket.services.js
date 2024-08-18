import { sendTicketEmail } from "../config/mail.js";
import TicketModel from "../daos/mongodb/models/ticket.model.js";


export const createTicketService = async ({ code, purchase_datetime, amount, purchaser, products },user) => {
    try {
        const newTicket = new TicketModel({
            code,
            purchase_datetime,
            amount,
            purchaser,
            products
        });
        
        await newTicket.save();
        const ticket= await getTicketbyIdService(newTicket._id);
        await sendTicketEmail(user.email, ticket);
        return newTicket;
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        throw new Error('No se pudo crear el ticket');
    }
};

const getTicketbyIdService = async (id) => {
    try {
        const ticket = await TicketModel.findById(id).populate('purchaser').populate('products.product');
        return ticket;
    } catch (error) {
        console.error('Error al obtener el ticket:', error);
        throw new Error('No se pudo obtener el ticket');
    }
};