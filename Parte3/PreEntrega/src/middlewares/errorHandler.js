// src/middlewares/errorHandler.js
import errorDictionary from '../utils/errorDictionary.js';


const errorHandler = (err, req, res, next) => {
    console.error('Error:', err); 
    
  
    const knownError = errorDictionary[err.message];
    
    if (knownError) {

        return res.status(400).json({
            error: knownError.code,
            message: knownError.message
        });
    }


    res.status(500).json({
        error: 'SERVER_ERROR',
        message: 'Ocurrió un error inesperado. Por favor, intenta más tarde.'
    });
};

export default errorHandler;
