import * as Joi from 'joi'

export const auth = {
    signUp: Joi.object({
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    signIn: Joi.object({
        body: {
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    })
}
