import Joi from "joi"

const userResponseDto = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    cart: Joi.array()
})

export const createUserDTO = (user) => {
    const { error, value } = userResponseDto.validate({
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        role: user.role,
        cart: user.cart
    });

    if (error) {
        throw new Error('Error al crear el DTO del usuario');
    }

    return value;
};