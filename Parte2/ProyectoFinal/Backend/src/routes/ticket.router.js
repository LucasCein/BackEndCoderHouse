import { Router } from 'express';
import { createTicket } from '../controllers/ticket.controller.js';
import { authenticateJWT } from '../middlewares/auth.js';

const router = Router();

router.post('/',authenticateJWT, createTicket);

export default router;
