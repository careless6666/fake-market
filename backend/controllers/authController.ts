import { Get, Post, Body, Route } from "tsoa";
import { validateRequest, auth } from "../validation/auth"
import { dataSourceLazy } from "../repository/psqlClient";
import { UserInfo } from "../repository/model/UserInfo";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from '../model/user'
import { ISignInPayload } from "../model/http/requests/authRequests";

interface PingResponse {
    message: string;
}

interface Error {
    message: string
    details: string | null
}

interface BaseResponse<T> {
    data: T | null,
    error: Error | null
}

export class ReponseHelper {
    public static createError(message: string, details: string | null = null) {
        return {
            data: null,
            error: {
                message,
                details
            }
        }
    }

    public static createSuccess<T>(data: T) {
        return {
            data: data,
            error: null
        }
    }
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

    @Post("/register")
    public async register(@Body() body: ISignInPayload): Promise<BaseResponse<User>> {
        
        var ds = await dataSourceLazy().initialize();

        try {
            
            var userRepository = ds.getRepository(UserInfo)

            const userInfo = await userRepository.findOne({
                where: {
                    email: body.email
                }
            });

            if (userInfo) {
                return ReponseHelper.createError("User Already Exist. Please Login");
            }

            const encryptedPassword = await bcrypt.hash(body.password, 10);

            const newUserInfo = new UserInfo();
            newUserInfo.email = body.email.toLowerCase();
            newUserInfo.lastName = body.lastName;
            newUserInfo.firstName = body.firstName;
            newUserInfo.password = encryptedPassword;

            await userRepository.save(newUserInfo);

            const token = jwt.sign(
                { user_id: newUserInfo.id, email: body.email },
                process.env.TOKEN_KEY ? process.env.TOKEN_KEY : '',
                { expiresIn: "2h" }
            );

            const user: User = {
                firstName: newUserInfo.firstName ? newUserInfo.firstName : '',
                lastName: newUserInfo.lastName ? newUserInfo.lastName : '',
                email: newUserInfo.email ? newUserInfo.email : '',
                token: token
            }

            return ReponseHelper.createSuccess<User>(user)

        } catch (e) {
            return ReponseHelper.createError((e as any).toString());
        } finally {
            await ds.destroy();
        }
    }
}