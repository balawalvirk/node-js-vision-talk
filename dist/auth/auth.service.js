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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const types_1 = require("../types");
const users_service_1 = require("../users/users.service");
const user_schema_1 = require("../users/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const otp_schema_1 = require("./otp.schema");
const axios_1 = require("axios");
const response_1 = require("../utils/response");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService, configService, otpModal, userModal) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.otpModal = otpModal;
        this.userModal = userModal;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne({ email });
        if (!user)
            return null;
        if (user.is_deleted)
            return null;
        const match = await (0, bcrypt_1.compare)(pass, user.password);
        if (!match)
            return null;
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async login(user) {
        const payload = { username: `${user.firstName} ${user.lastName}`, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get('JWT_TOKEN_SECRET') }),
        };
    }
    AddMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    async createOtp(body) {
        return await this.otpModal.create(body);
    }
    async findOneOtp(filter) {
        return await this.otpModal.findOne(filter);
    }
    async loginGoogle(payload) {
        try {
            const response = await axios_1.default.get(`${process.env.BASE_URL_GOOGLE_AUTH}${payload.token}`);
            const decoded = response.data;
            if (!decoded.email) {
                return (0, response_1.errorResponse)(404, 'Invalid token.');
            }
            else {
                const user = await this.userModal.findOne({ email: decoded.email });
                if (user) {
                    const payload = { sub: user._id, role: "user" };
                    user._doc.access_token = this.jwtService.sign(payload);
                    return (0, response_1.successResponse)(200, 'user', user);
                }
                else {
                    const user = await this.userModal.create({ email: decoded.email, first_name: decoded.given_name, last_name: decoded.family_name,
                        authType: types_1.AuthTypes.GOOGLE });
                    const payload = { sub: user._id, role: "user" };
                    user._doc.access_token = this.jwtService.sign(payload);
                    return (0, response_1.successResponse)(200, 'user', user);
                }
            }
        }
        catch (e) {
            return (0, response_1.errorResponse)(500, e);
        }
    }
    async facebookLogin(payload) {
        try {
            const response = await axios_1.default.get(`${process.env.FACEBOOK_AUTH_URL}access_token=${payload.token}&debug=all&fields=id%2Cname%2Cemail%2Cfirst_name%2Clast_name
            &format=json&method=get&pretty=0&suppress_http_code=1`);
            console.log(`${process.env.FACEBOOK_AUTH_URL}access_token=${payload.token}&debug=all&fields=id%2Cname%2Cemail%2Cfirst_name%2Clast_name&format=json&method=get&pretty=0&suppress_http_code=1`);
            const decoded = response.data;
            if (!decoded.email) {
                return (0, response_1.errorResponse)(404, 'Invalid token.');
            }
            else {
                const user = await this.userModal.findOne({ email: decoded.email });
                if (user) {
                    const payload = { sub: user._id, role: "user" };
                    user._doc.access_token = this.jwtService.sign(payload);
                    return (0, response_1.successResponse)(200, 'user', user);
                }
                else {
                    const user = await this.userModal.create({ email: decoded.email, first_name: decoded.first_name,
                        last_name: decoded.last_name,
                        authType: types_1.AuthTypes.FACEBOOK });
                    const payload = { sub: user._id, role: "user" };
                    user._doc.access_token = this.jwtService.sign(payload);
                    return (0, response_1.successResponse)(200, 'user', user);
                }
            }
        }
        catch (e) {
            return (0, response_1.errorResponse)(500, e);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __param(4, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map