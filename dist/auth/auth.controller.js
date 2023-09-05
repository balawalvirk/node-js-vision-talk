"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./local-auth.guard");
const register_dto_1 = require("./dtos/register.dto");
const bcrypt_1 = require("bcrypt");
const helpers_1 = require("../helpers");
const reset_pass_dto_1 = require("./dtos/reset-pass.dto");
const email_service_1 = require("../helpers/services/email.service");
const forgot_pass_dto_1 = require("./dtos/forgot-pass.dto");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, userService, emailService) {
        this.authService = authService;
        this.userService = userService;
        this.emailService = emailService;
    }
    async login(user) {
        const { access_token } = await this.authService.login(user);
        return { access_token, user };
    }
    async register(registerDto) {
        const emailExists = await this.userService.findOneRecord({ email: registerDto.email });
        if (emailExists)
            throw new common_1.BadRequestException('User already exists with this email.');
        const user = await this.userService.createRecord(Object.assign(Object.assign({}, registerDto), { password: await (0, bcrypt_1.hash)(registerDto.password, 10) }));
        const { access_token } = await this.authService.login(user);
        return { access_token, user };
    }
    async forgetPassword({ email }) {
        const user = await this.userService.findOneRecord({ email });
        if (!user)
            throw new common_1.BadRequestException('Email does not exists.');
        const otp = await this.authService.createOtp({
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
        await this.emailService.send(mail);
        return { message: 'Otp sent to your email.' };
    }
    async resetPassword({ password, otp }) {
        const otpFound = await this.authService.findOneOtp({ otp });
        if (!otpFound)
            throw new common_1.BadRequestException('Invalid Otp.');
        const diff = otpFound.expireIn - new Date().getTime();
        if (diff < 0)
            throw new common_1.BadRequestException('Otp expired.');
        await this.userService.findOneRecordAndUpdate({ email: otpFound.email }, { password: await (0, bcrypt_1.hash)(password, 10) });
        return { message: 'Password changed successfully.' };
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, helpers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_pass_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_pass_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService, email_service_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map