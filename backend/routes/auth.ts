import express from "express";
import {AuthController} from "../controllers/authController";

const router = express.Router();

router.post("/sign-in", async (req, res) => {
    const controller = new AuthController();
    const response = await controller.signIn(req.body);
    return res.send(response);
});

export default router