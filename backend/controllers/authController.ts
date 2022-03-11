import { Request, Response } from "express";
import {Get, Route} from "tsoa";
import express from "express";

const router = express.Router();

interface PingResponse {
    message: string;
}

@Route("ping")
export default class PingController {
    @Get("/")
    public async getMessage(): Promise<PingResponse> {
        return {
            message: "pong",
        };
    }
}
//
// export const signIn = (req: Request, res: Response) => {
//     res.render("home", {
//         title: "Home"
//     });
// };
//
// export const signUp = (req: Request, res: Response) => {
//     res.render("home", {
//         title: "Home"
//     });
// };