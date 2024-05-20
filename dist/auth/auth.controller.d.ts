/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UserDocument } from 'src/users/user.schema';
import { RegisterDto } from './dtos/register.dto';
import { ResetPasswordDto } from './dtos/reset-pass.dto';
import { EmailService } from 'src/helpers/services/email.service';
import { ForgotPasswordDto } from './dtos/forgot-pass.dto';
import { LoginWithSocialDto } from "src/auth/dtos/login";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly emailService;
    constructor(authService: AuthService, userService: UsersService, emailService: EmailService);
    login(user: UserDocument): Promise<{
        access_token: string;
        user: import("mongoose").Document<unknown, {}, import("src/users/user.schema").User> & Omit<import("src/users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    register(file: any, registerDto: RegisterDto): Promise<{
        access_token: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("src/users/user.schema").User> & Omit<import("src/users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>> & Omit<import("mongoose").Document<unknown, {}, import("src/users/user.schema").User> & Omit<import("src/users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>;
    }>;
    forgetPassword({ email }: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword({ password, otp }: ResetPasswordDto): Promise<{
        message: string;
    }>;
    loginWithGoogle(body: LoginWithSocialDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    loginWithApple(body: LoginWithSocialDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
