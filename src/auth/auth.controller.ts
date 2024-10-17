import {
    BadRequestException,
    Body,
    Controller,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './local-auth.guard';
import {UserDocument} from 'src/users/user.schema';
import {RegisterDto} from './dtos/register.dto';
import {hash} from 'bcrypt';
import {CurrentUser} from 'src/helpers';
import {OtpDocument} from './otp.schema';
import {ResetPasswordDto} from './dtos/reset-pass.dto';
import {EmailService} from 'src/helpers/services/email.service';
import {ForgotPasswordDto} from './dtos/forgot-pass.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import FileUploadToS3 from "src/utils/FileUploadToS3";
import {LoginWithSocialDto} from "src/auth/dtos/login";
import {sendEmail} from "src/utils/email";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService, private readonly emailService: EmailService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@CurrentUser() user: UserDocument) {
        const {access_token} = await this.authService.login(user);
        return {access_token, user};
    }


    @UseInterceptors(FileInterceptor('file', {storage: FileUploadToS3.uploadFile()}))
    @Post('register')
    async register(@UploadedFile(new ParseFilePipe({fileIsRequired: false})) file: any,
                   @Body() registerDto: RegisterDto) {
        const emailExists = await this.userService.findOneRecord({email: registerDto.email});
        if (emailExists) throw new BadRequestException('User already exists with this email.');
        const user = await this.userService.createRecord({
            ...registerDto,
            avatar:file?.location || "",
            password: await hash(registerDto.password, 10)
        });
        const {access_token} = await this.authService.login(user);
        return {access_token, user};
    }

    @Post('forget-password')
    async forgetPassword(@Body() {email}: ForgotPasswordDto) {
        const user = await this.userService.findOneRecord({email});
        if (!user) throw new BadRequestException('Email does not exists.');
        const otp: OtpDocument = await this.authService.createOtp({
            otp: Math.floor(Math.random() * 10000 + 1),
            expireIn: new Date().getTime() + 300 * 1000,
            email,
        });
        const mail = {
            to: email,
            subject: 'Change Password request',
            from: 'awaismehr001@gmail.com',
            text: 'Hello World from NestJS Sendgrid',
            html: `<h1>password reset otp</h1> <br/> ${otp.otp} </br> This otp will expires in 5 minuutes`,
        };
        await sendEmail(process.env.SUPPORT_EMAIL,email,"Change Password request",`<h1>password reset otp</h1> <br/> ${otp.otp} </br> This otp will expires in 5 minuutes`,
            `<h1>password reset otp</h1> <br/> ${otp.otp} </br> This otp will expires in 5 minuutes`);
        return {message: 'Otp sent to your email.'};
    }

    @Post('reset-password')
    async resetPassword(@Body() {password, otp}: ResetPasswordDto) {
        const otpFound: OtpDocument = await this.authService.findOneOtp({otp});
        if (!otpFound) throw new BadRequestException('Invalid Otp.');
        const diff = otpFound.expireIn - new Date().getTime();
        if (diff < 0) throw new BadRequestException('Otp expired.');
        await this.userService.findOneRecordAndUpdate({email: otpFound.email}, {password: await hash(password, 10)});
        return {message: 'Password changed successfully.'};
    }

    @Post('/google')
    async loginWithGoogle(@Body() body: LoginWithSocialDto) {

        const user = await this.authService.loginGoogle(body);
        return user;
    }


    @Post('/facebook')
    async loginWithApple(@Body() body: LoginWithSocialDto) {

        const user = await this.authService.facebookLogin(body);
        return user;
    }






}
