import express from "express";
const auth = require("../middleware/auth");
import { AuthController } from "../controllers/authController";
import { validateRequest, auth as authValidation } from "../validation/auth"
import { ISignInPayload, ISignUpPayload } from "../model/http/requests/authRequests";
import { ReponseHelper } from "../model/http/responses/reponseHelper";
import { ClientError } from "../Exceptions/clientErrors";

const router = express.Router();

router.post('/sign-up',
    (req, res) => {
    ReponseHelper.safeCallAsync(res, () => {
        const body = req.body as ISignUpPayload;

        const invalidResult = validateRequest(req, authValidation.signUp);
        if(invalidResult) 
            throw new ClientError(invalidResult);

        return new AuthController().signUp(body)
    })
})

router.post("/sign-in",
    (req, res) => {
        ReponseHelper.safeCallAsync(res , () => {
            const body = req.body as ISignInPayload;

            const invalidResult = validateRequest(req, authValidation.signIn);
            if(invalidResult) 
                throw new ClientError(invalidResult);

            return new AuthController().signIn(body)
        })
    });


export default router