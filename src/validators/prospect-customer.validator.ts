import * as Joi from 'joi';
import { CONSTANTS } from '../static/constants';

const prospectCustomerValidator = {
    create: Joi.object({
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            documentNumber: Joi.string().max(14).required()
        })
    }),

    update: Joi.object({
        body: Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            documentNumber: Joi.string().max(14).required()
        })
    }),

    getById: Joi.object({
        params: Joi.object({
            id: Joi.number().required()
        })
    }),

    getAll: Joi.object({
        query: Joi.object({
            page: Joi.number().min(1).default(1),
            pageLimit: Joi.number().min(1).max(CONSTANTS.MAX_PAGE_LIMIT).default(CONSTANTS.DEFAULT_PAGE_LIMIT),
            q: Joi.string()
        })
    }),

    delete: Joi.object({
        params: Joi.object({
            id: Joi.number().required()
        })
    }),
}

export { prospectCustomerValidator };