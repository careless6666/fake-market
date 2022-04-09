import express from "express";
const auth = require("../middleware/auth");
import { AuthController } from "../controllers/authController";
import { validateRequest, auth as authValidation } from "../validation/auth"
import { ISignInPayload } from "../model/http/requests/authRequests";


const router = express.Router();

router.post('/register', async (req, res, next) => {
    
    const { firstName, lastName, email, password } = req.body;

    const body: ISignInPayload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    } 

    validateRequest(req, next, authValidation.register)

    var response = await new AuthController().register(body)
    //throw new Error('jopa')

    res.status(200).json(response);
})

router.post("/login", async (req, res) => { });


export default router