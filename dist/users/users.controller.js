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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const change_pass_dto_1 = require("./dto/change-pass.dto");
const bcrypt_1 = require("bcrypt");
const helpers_1 = require("../helpers");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async changePassword({ newPassword, oldPassword }, user) {
        const userFound = await this.usersService.findOneRecord({ _id: user._id });
        const match = await (0, bcrypt_1.compare)(oldPassword, userFound.password);
        if (!match)
            throw new common_1.BadRequestException('Old password is incorrect.');
        await this.usersService.findOneRecordAndUpdate({ _id: user._id }, { password: await (0, bcrypt_1.hash)(newPassword, 10) });
        return 'Password changed successfully.';
    }
    async update(updateUserDto, user) {
        return await this.usersService.findOneRecordAndUpdate({ _id: user._id }, updateUserDto);
    }
};
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, helpers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_pass_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, helpers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map