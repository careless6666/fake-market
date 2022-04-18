import * as Joi from 'joi'

export const productValidator = {
    query: Joi.object({
        body: {
            offset: Joi.number().required(),
            limit:  Joi.number().required()
        }
    })
}