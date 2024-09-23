// src/daos/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true }, // UUID generado por faker
    name: { type: String, required: true }, // Nombre del usuario
    email: { type: String, required: true, unique: true }, // Email único del usuario
    password: { type: String, required: true }, // Contraseña encriptada
    role: { type: String, enum: ['user', 'admin'], required: true }, // Rol del usuario
    pets: { type: [String], default: [] } // Array de mascotas, inicialmente vacío
});

export const UserModel = mongoose.model('User', userSchema);
