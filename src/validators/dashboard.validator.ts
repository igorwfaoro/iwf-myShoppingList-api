import * as Joi from 'joi';

const dashboardValidator = {
    getStatistics: Joi.object({
        query: Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required()
        })
    }),
    getProspectCustomersPerDay: Joi.object({
        query: Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required()
        })
    }),
    getSalesPerDay: Joi.object({
        query: Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required()
        })
    })
};

export { dashboardValidator };