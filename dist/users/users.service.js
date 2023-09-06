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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_service_1 = require("../helpers/services/base.service");
const user_schema_1 = require("./user.schema");
const response_1 = require("../utils/response");
let UsersService = exports.UsersService = class UsersService extends base_service_1.BaseService {
    constructor(userModal) {
        super(userModal);
        this.userModal = userModal;
    }
    async findOne(query) {
        return await this.userModal.findOne(query).lean();
    }
    async addFollower(userId, body) {
        const user = await this.userModal.findById(userId);
        const findFollowerIndex = (user.followers || []).findIndex((follower) => follower.toString() === body.user);
        if (findFollowerIndex !== -1) {
            return (0, response_1.errorResponse)(400, 'Already added in followers list.');
        }
        (user.followers).push(body.user);
        const saveUser = await user.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async addFollowing(userId, body) {
        const user = await this.userModal.findById(userId);
        const findFollowerIndex = (user.followings || []).findIndex((following) => following.toString() === body.user);
        if (findFollowerIndex !== -1) {
            return (0, response_1.errorResponse)(400, 'Already added in following list.');
        }
        (user.followings).push(body.user);
        const saveUser = await user.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async deleteFollower(userId, followerId) {
        const user = await this.userModal.findById(userId);
        const findFollowerIndex = (user.followers || []).findIndex((follower) => follower.toString() === followerId);
        if (findFollowerIndex === -1) {
            return (0, response_1.errorResponse)(404, 'Follower not exist.');
        }
        user.followers = (user.followers || []).filter((follower) => (follower).toString() !== followerId.toString());
        const saveUser = await user.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async deleteFollowing(userId, followingId) {
        const user = await this.userModal.findById(userId);
        const findFollowingIndex = (user.followings || []).findIndex((following) => following.toString() === followingId.toString());
        if (findFollowingIndex === -1) {
            return (0, response_1.errorResponse)(404, 'Following not exist.');
        }
        user.followings = (user.followings || []).filter((following) => (following).toString() !== followingId.toString());
        const saveUser = await user.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async getUserById(userId) {
        const user = await this.userModal.findById(userId)
            .populate("followers", 'firstName lastName email avatar', user_schema_1.User.name)
            .populate("followings", "firstName lastName email avatar", user_schema_1.User.name);
        return (0, response_1.successResponse)(200, 'post', user);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map