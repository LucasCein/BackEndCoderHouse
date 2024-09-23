import express from 'express';
import connectDB from './src/config/database.js';
import mocksRouter from './src/routes/mock.router.js';
import dotenv from 'dotenv';
import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/mocks', mocksRouter);

// Manejador de Errores
app.use(errorHandler); // Este middleware debe estar al final, después de todas las rutas

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
