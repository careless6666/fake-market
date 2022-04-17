
export function validateRequest(req: any, schema:any): string | undefined {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req, options);
    if (error) {
        return `Validation error: ${error.details.map((x: any) => x.message).join(', ')}`
    }
}

