import { Get, Post, Body, Route } from "tsoa";
import { dataSourceLazy } from "../repository/psqlClient";
import { UserInfo } from "../repository/model/UserInfo";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from '../model/user'
import { BaseResponse, ReponseHelper } from "../model/http/responses/reponseHelper"
import { ISignInPayload, ISignUpPayload } from "../model/http/requests/authRequests";
import { LoginResult } from "../model/http/responses/loginResult";
import { validateRequest, auth as authValidation } from "../validation/auth";
import { ClientError } from "../Exceptions/clientErrors";

const TokenKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGJS+6HbYvOCR8186CXHHqlg9o/Txhlo0dsAfHDw258wAKSuuOELsCCUyPakWKStKzF5D/NGtl7VpvfAG/7s9oBAlaXyO//s4SznsttaanmvGLDj1kuJpqEi/J55GzWGprPXQrWCmUDGxE+pDci6yMdqSjVJh0Xq+HKzCven4YuwIDAQAB'

@Route("api/v1/auth/")
export class AuthController {
    @Post("/sign-in")
    public async signIn(@Body() body: ISignInPayload): Promise<BaseResponse<LoginResult>> {

        const invalidResult = validateRequest(body, authValidation.signUp);
        if(invalidResult) 
            throw new ClientError(invalidResult);

        var ds = await dataSourceLazy().initialize();

        try {

            /*var userRepository = ds.getRepository(UserInfo)
            
            const userInfo = await userRepository.findOne({
                where: {
                    email: body.email
                }
            });*/

            const userInfo = await ds
                .getRepository(UserInfo)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: body.email })
                .getOne()            

            if(!userInfo){
                return ReponseHelper.createError("User not found, please sign up");
            }

            if (userInfo && (await bcrypt.compare(body.password, userInfo?.password ?? ''))) {
                const token = jwt.sign(
                    { user_id: userInfo.id, email: userInfo.email},
                    TokenKey,
                    {
                        expiresIn: "6h",
                    }
                );
    
                return ReponseHelper.createSuccess({
                    email: userInfo.email ?? '',
                    firstName: userInfo.firstName ?? '',
                    lastName: userInfo.lastName ?? '',
                    token: token
                });
            }

            return ReponseHelper.createError("Invalid Credentials");
        }
        catch (e) {
            return ReponseHelper.createError((e as any).toString());
        } finally {
            await ds.destroy();
        }
    }

    @Post("/sign-up")
    public async signUp(@Body() body: ISignUpPayload): Promise<BaseResponse<User>> {

        var ds = await dataSourceLazy().initialize();

        try {

            var userRepository = ds.getRepository(UserInfo)

            const userInfo = await ds
                .getRepository(UserInfo)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: body.email })
                .getOne()

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
                TokenKey,
                { expiresIn: "6h" }
            );

            const user: User = {
                firstName: newUserInfo.firstName ?? '',
                lastName: newUserInfo.lastName ?? '',
                email: newUserInfo.email ?? '',
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