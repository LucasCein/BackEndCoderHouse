// src/routes/mocks.router.js
import express from 'express';
import { generateData, getUsersData, getPetsData } from '../controllers/mockController.js';

const router = express.Router();

router.post('/generateData', generateData);
router.get('/mockingusers', getUsersData);
router.get('/mockingpets', getPetsData);

export default router;
