import bcrypt from 'bcrypt';
import UserModel from "./models/user.model.js";
export default class UserDaoMongoDb {
    constructor(db) {
        this.db = db;
    }
    async createCart({ products }) {
        try {
            const newCart = await CartModel.create({ products });  // Almacenar `products` directamente en la base de datos
            return newCart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async getByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const user = await UserModel.findOne({ _id: id });
            return user;
        } catch (error) {
            console.error(error);
        }
    }

}