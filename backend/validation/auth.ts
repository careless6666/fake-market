import Joi from 'joi';

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

export function validateRequest(req: any, next:any, schema:any) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map((x: any) => x.message).join(', ')}`);
    } else {
        //req.body = value;
        //next();
    }
}
