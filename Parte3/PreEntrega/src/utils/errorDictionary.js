// src/utils/errorDictionary.js

const errorDictionary = {
    VALIDATION_ERROR: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos proporcionados no son válidos. Por favor, verifica la información enviada.'
    },
    DUPLICATE_EMAIL: {
        code: 'DUPLICATE_EMAIL',
        message: 'El correo electrónico ya está registrado. Por favor, usa otro correo.'
    },
    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        message: 'El usuario no fue encontrado. Verifica la información proporcionada.'
    },
    PET_NOT_FOUND: {
        code: 'PET_NOT_FOUND',
        message: 'La mascota no fue encontrada. Verifica la información proporcionada.'
    },
    DATABASE_ERROR: {
        code: 'DATABASE_ERROR',
        message: 'Error en la base de datos. Intenta nuevamente más tarde.'
    },
    SERVER_ERROR: {
        code: 'SERVER_ERROR',
        message: 'Error interno del servidor. Por favor, intenta más tarde.'
    }
    // Agrega más errores comunes aquí
};

export default errorDictionary;
