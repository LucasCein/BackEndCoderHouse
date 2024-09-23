// src/utils/user.utils.js
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';


export const generateUser = async () => {
    const password = await bcrypt.hash('coder123', 10); 
    const user = {
        id: faker.string.uuid(), 
        name: faker.person.firstName(), 
        email: faker.internet.email(), 
        password: password, 
        role: faker.helpers.arrayElement(['user', 'admin']), 
        pets: [] 
    };
    console.log('Usuario generado:', user); 
    return user;
};
