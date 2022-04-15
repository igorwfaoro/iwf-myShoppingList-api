import * as Joi from 'joi';

const shoppingListValidator = {
    create: Joi.object({
        body: Joi.object({
            name: Joi.string().required()
        }).required()
    }),
    getById: Joi.object({
        params: Joi.object({
            id: Joi.number().required()
        }).required()
    }),
    update: Joi.object({
        body: Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required()
        }).required()
    }),
    delete: Joi.object({
        params: Joi.object({
            id: Joi.number().required()
        }).required()
    })
};

export { shoppingListValidator };