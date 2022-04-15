import * as Joi from 'joi';

const productValidator = {
    getByBarcode: Joi.object({
        params: Joi.object({
            barcode: Joi.string().required()
        }).required()
    })
};

export { productValidator };