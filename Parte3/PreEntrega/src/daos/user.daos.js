// src/daos/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true }, 
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    role: { type: String, enum: ['user', 'admin'], required: true }, 
    pets: { type: [String], default: [] } 
});

export const UserModel = mongoose.model('User', userSchema);
