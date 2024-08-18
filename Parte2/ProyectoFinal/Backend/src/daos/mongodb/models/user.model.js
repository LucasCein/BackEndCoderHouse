import { model, Schema } from "mongoose";


export const userCollectionName = "users";

export const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
});

const UserModel = model(userCollectionName, userSchema);
export default UserModel