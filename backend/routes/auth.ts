import express from "express";
const auth = require("../middleware/auth");
import { AuthController } from "../controllers/authController";
import { validateRequest, auth as authValidation } from "../validation/auth"
import { ISignInPayload, ISignUpPayload } from "../model/http/requests/authRequests";
import { ReponseHelper } from "../model/http/responses/reponseHelper";


const router = express.Router();

router.post('/sign-up', (req, res, next) => {

    ReponseHelper.safeCallAsync(res, async()=> {
        const body = req.body as ISignUpPayload;

        validateRequest(req, next, authValidation.signUp)

        return new AuthController().signUp(body)
    })
})

router.post("/sign-in", async (req, res, next) => { 
    ReponseHelper.safeCallAsync(res, async()=> {
        const body = req.body as ISignInPayload;

        validateRequest(req, next, authValidation.signIn)

        return new AuthController().signIn(body)
    })
});


export default router