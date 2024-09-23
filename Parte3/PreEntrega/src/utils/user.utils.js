// src/utils/user.utils.js
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

// Genera un usuario con los campos requeridos
export const generateUser = async () => {
    const password = await bcrypt.hash('coder123', 10); // Encriptar la contraseña
    const user = {
        id: faker.string.uuid(), // Genera un UUID único
        name: faker.person.firstName(), // Utiliza faker.person.firstName() en lugar de faker.name.firstName()
        email: faker.internet.email(), // Email aleatorio
        password: password, // Contraseña encriptada
        role: faker.helpers.arrayElement(['user', 'admin']), // Rol aleatorio entre 'user' y 'admin'
        pets: [] // Array vacío para mascotas
    };
    console.log('Usuario generado:', user); // Añadir un log para verificar los datos generados
    return user;
};
