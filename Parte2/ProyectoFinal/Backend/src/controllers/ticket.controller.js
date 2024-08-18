import { createTicketService } from "../services/ticket.services.js";



export const createTicket = async (req, res) => {
    try {
        const ticketData = req.body;
        const user= req.user
        const ticket = await createTicketService(ticketData,user);

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el ticket' });
    }
};
