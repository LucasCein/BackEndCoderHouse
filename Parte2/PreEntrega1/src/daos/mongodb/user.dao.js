import bcrypt from 'bcrypt';
import UserModel from "./models/user.model.js";
export default class UserDaoMongoDb {
    constructor(db) {
        this.db = db;
    }
    async create(user) {
        try {
            const newUser = await UserModel.create(user);
            return newUser;
        } catch (error) {
            console.error(error);
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