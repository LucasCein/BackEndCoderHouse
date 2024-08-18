import { model, Schema } from "mongoose";

export const ticketCollectionName = "tickets";

export const ticketSchema = new Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: Schema.Types.ObjectId, ref: "users", required: true },
    products: [
        {
            _id: false,
            product: { type: Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

const TicketModel = model(ticketCollectionName, ticketSchema)

export default TicketModel
