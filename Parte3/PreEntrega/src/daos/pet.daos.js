// src/daos/Pet.js
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    id: String,
    name: String,
    breed: String,
    age: Number,
    adopted: Boolean,
    owner: { type: String, default: null }
});

export const PetModel = mongoose.model('Pet', petSchema);
