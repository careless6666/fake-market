import {Get, Post, Body, Route} from "tsoa";

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

interface ISignInPayload {
    userName: string,
    password: string
}

@Route("api/v1/auth/")
export class AuthController {
    @Post("/sign-in")
    public async signIn(@Body() body: ISignInPayload): Promise<PingResponse> {
        return {
            message: "pong",
        };
    }

    @Get("/sign-up")
    public async signUp(): Promise<PingResponse> {
        return {
            message: "pong",
        };
    }
}