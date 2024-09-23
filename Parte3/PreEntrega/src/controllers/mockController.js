// src/controllers/mockController.js
import { createUsersMock, getUsers } from '../services/user.service.js';
import { createPetsMock, getPets } from '../services/pet.service.js';
import errorDictionary from '../utils/errorDictionary.js';

export const generateData = async (req, res, next) => {
    try {
        const { users, pets } = req.body;

        if (!users || !pets) {
            return next(new Error('VALIDATION_ERROR')); // Usa el mensaje del diccionario de errores
        }

        await createUsersMock(users);
        await createPetsMock(pets);

        res.status(201).json({
            message: `Se han insertado ${users} usuarios y ${pets} mascotas en la base de datos.`
        });
    } catch (error) {
        return next(new Error('DATABASE_ERROR')); // Enviar error de base de datos si falla
    }
};

export const getUsersData = async (req, res, next) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        return next(new Error('DATABASE_ERROR')); // Enviar error de base de datos si falla
    }
};

export const getPetsData = async (req, res, next) => {
    try {
        const pets = await getPets();
        res.json(pets);
    } catch (error) {
        return next(new Error('DATABASE_ERROR')); // Enviar error de base de datos si falla
    }
};
