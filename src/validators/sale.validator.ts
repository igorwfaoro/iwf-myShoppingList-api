import * as Joi from 'joi';

const saleValidator = {
    createMulti: Joi.object({
        body: Joi.array().items(Joi.object({
            prospectCustomerId: Joi.number().required(),
            price: Joi.number().required()
        }))
    })
};

export { saleValidator };