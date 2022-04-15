import * as Joi from 'joi';

const shoppingListProductValidator = {
    add: Joi.object({
        params: Joi.object({
            shoppingListId: Joi.number().required()
        }).required(),
        body: Joi.object({
            shoppingListId: Joi.number().required(),
            productId: Joi.number().required(),
            quantity: Joi.number().required()
        })
    }),
    remove: Joi.object({
        params: Joi.object({
            shoppingListProductId: Joi.number().required()
        }).required()
    }),
    update: Joi.object({
        body: Joi.object({
            shoppingListProductId: Joi.number().required(),
            quantity: Joi.number().required()
        }).required()
    }),
    getAll: Joi.object({
        params: Joi.object({
            shoppingListId: Joi.number().required()
        }).required()
    })
};

export { shoppingListProductValidator };