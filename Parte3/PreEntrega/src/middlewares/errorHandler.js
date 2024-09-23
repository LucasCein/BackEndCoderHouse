// src/middlewares/errorHandler.js
import errorDictionary from '../utils/errorDictionary.js';

// Manejador global de errores
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err); // Imprime el error completo en consola para debugging
    
    // Verifica si el error es del diccionario de errores
    const knownError = errorDictionary[err.message];
    
    if (knownError) {
        // Si es un error conocido, responde con el código y mensaje del diccionario
        return res.status(400).json({
            error: knownError.code,
            message: knownError.message
        });
    }

    // Si no es un error conocido, responde con un mensaje genérico
    res.status(500).json({
        error: 'SERVER_ERROR',
        message: 'Ocurrió un error inesperado. Por favor, intenta más tarde.'
    });
};

export default errorHandler;
