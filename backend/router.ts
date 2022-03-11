import {Express} from "express";
import * as authController from "./controllers/authController";

export class Router{
    public static Init(app: Express){
        app.post("/sign-in", authController.signIn)
        app.post("/sign-up", authController.signUp)
    }
}