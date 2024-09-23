// src/utils/pet.utils.js
import { faker } from '@faker-js/faker';

// Genera una mascota con los campos requeridos
export const generatePet = () => {
    return {
        id: faker.string.uuid(), // Genera un UUID único
        name: faker.animal.dog(), // Genera un nombre aleatorio de mascota
        breed: faker.animal.dog(), // Raza de perro (puedes cambiar por otros animales si lo deseas)
        age: faker.number.int({ min: 1, max: 15 }), // Edad aleatoria entre 1 y 15
        adopted: false, // Mascota no adoptada inicialmente
        owner: null // Sin dueño inicialmente
    };
};
