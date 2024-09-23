// src/utils/pet.utils.js
import { faker } from '@faker-js/faker';


export const generatePet = () => {
    return {
        id: faker.string.uuid(), 
        name: faker.animal.dog(), 
        breed: faker.animal.dog(), 
        age: faker.number.int({ min: 1, max: 15 }), 
        adopted: false, 
        owner: null 
    };
};
