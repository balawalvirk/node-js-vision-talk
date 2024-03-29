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
const user_dto_1 = require("./dto/user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const FileUploadToS3_1 = require("../utils/FileUploadToS3");
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
    async update(file, updateUserDto, user) {
        return await this.usersService.findOneRecordAndUpdate({ _id: user._id }, Object.assign(Object.assign({}, updateUserDto), { avatar: (file === null || file === void 0 ? void 0 : file.location) || user.avatar }));
    }
    async updateTutorialVideo(user, file) {
        return await this.usersService.findOneRecordAndUpdate({ _id: user._id }, { tutorialVideo: (file === null || file === void 0 ? void 0 : file.location) || user.tutorialVideo });
    }
    async addFollower(body, req) {
        return await this.usersService.addFollower(req.user._id, body);
    }
    async addFollowing(body, req) {
        return await this.usersService.addFollowing(req.user._id, body);
    }
    async deleteFollower(followerId, req) {
        return await this.usersService.deleteFollower(req.user._id, followerId);
    }
    async deleteFollowing(followingId, req) {
        return await this.usersService.deleteFollowing(req.user._id, followingId);
    }
    async getMe(req) {
        return await this.usersService.getUserById(req.user._id);
    }
    async getUserById(id) {
        return await this.usersService.getUserById(id);
    }
    async deleteProfile(req) {
        return await this.usersService.deleteUser(req.user._id);
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: false }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, helpers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Put)('update-tutorial-video'),
    __param(0, (0, helpers_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: false }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateTutorialVideo", null);
__decorate([
    (0, common_1.Post)('follower'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateFollowerFollowingDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addFollower", null);
__decorate([
    (0, common_1.Post)('following'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateFollowerFollowingDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addFollowing", null);
__decorate([
    (0, common_1.Delete)('follower/:followerId'),
    __param(0, (0, common_1.Param)('followerId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteFollower", null);
__decorate([
    (0, common_1.Delete)('following/:followingId'),
    __param(0, (0, common_1.Param)('followingId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteFollowing", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map