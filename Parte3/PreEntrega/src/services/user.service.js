// src/services/user.service.js
import { UserModel } from '../daos/user.daos.js';
import { generateUser } from '../utils/user.utils.js';

export const createUsersMock = async (cant = 20) => {
    try {
        const usersArray = [];
        for (let i = 0; i < cant; i++) {
            const user = await generateUser(); // Usa 'await' para esperar a que se genere cada usuario
            usersArray.push(user);
        }
        return await UserModel.create(usersArray); // Inserta todos los usuarios generados en la base de datos
    } catch (error) {
        console.error('Error al crear usuarios:', error.message); // Imprimir el error en la consola
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
