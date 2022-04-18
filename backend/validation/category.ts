import * as Joi from 'joi'

export const categoryValidator = {
    create: Joi.object({
        body: {
            name: Joi.string().required()
        }
    })
}