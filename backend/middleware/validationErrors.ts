import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
  } from "express";
  import { ValidateError } from "tsoa";
  import * as core from "express-serve-static-core";
    
export function addValidationErrorMiddleware(app: core.Express){
    app.use(function errorHandler(
        err: unknown,
        req: ExRequest,
        res: ExResponse,
        next: NextFunction
      ): ExResponse | void {
        if (err instanceof ValidateError) {
          console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
          return res.status(200).json({
            message: "Validation Failed",
            details: err?.fields,
          });
        }
        if (err instanceof Error) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
      
        next();
      });
}

  