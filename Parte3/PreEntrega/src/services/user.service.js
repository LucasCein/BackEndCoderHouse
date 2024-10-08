// src/services/user.service.js
import { UserModel } from '../daos/user.daos.js';
import { generateUser } from '../utils/user.utils.js';

export const createUsersMock = async (cant = 20) => {
    try {
        const usersArray = [];
        for (let i = 0; i < cant; i++) {
            const user = await generateUser(); 
            usersArray.push(user);
        }
        return await UserModel.create(usersArray); 
    } catch (error) {
        console.error('Error al crear usuarios:', error.message); 
        throw new Error(error);
    }
};

export const getUsers = async () => {
    try {
        return await UserModel.find({});
    } catch (error) {
        throw new Error(error);
    }
};
