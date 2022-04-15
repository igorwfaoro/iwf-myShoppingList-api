import * as Joi from 'joi';

const authValidator = {
    login: Joi.object({
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }).required()
    })
};

export { authValidator };