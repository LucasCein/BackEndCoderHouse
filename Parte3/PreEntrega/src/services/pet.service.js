// src/services/pet.service.js
import { PetModel } from '../daos/pet.daos.js';
import { generatePet } from '../utils/pet.utils.js';

export const createPetsMock = async (cant = 20) => {
    try {
        const petsArray = [];
        for (let i = 0; i < cant; i++) {
            const pet = generatePet();
            petsArray.push(pet);
        }
        return await PetModel.create(petsArray);
    } catch (error) {
        throw new Error(error);
    }
};

export const getPets = async () => {
    try {
        return await PetModel.find({});
    } catch (error) {
        throw new Error(error);
    }
};
