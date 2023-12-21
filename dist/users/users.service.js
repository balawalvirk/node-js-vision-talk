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
        return await this.userModal.findOne(query)
            .populate("savedArticles")
            .populate("savedPosts")
            .lean();
    }
    async addFollower(userId, body) {
        const user = await this.userModal.findById(userId);
        const follower = await this.userModal.findById(body.user);
        if (!follower)
            return (0, response_1.errorResponse)(404, 'follower not exist.');
        const findFollowerIndex = (user.followers || []).findIndex((follower) => follower.toString() === body.user);
        if (findFollowerIndex !== -1) {
            return (0, response_1.errorResponse)(400, 'Already added in followers list.');
        }
        (user.followers).push(body.user);
        const saveUser = await user.save();
        (follower.followings).push(userId);
        const saveFollower = await follower.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async addFollowing(userId, body) {
        const user = await this.userModal.findById(userId);
        const following = await this.userModal.findById(body.user);
        if (!following)
            return (0, response_1.errorResponse)(404, 'following not exist.');
        const findFollowerIndex = (user.followings || []).findIndex((following) => following.toString() === body.user);
        if (findFollowerIndex !== -1) {
            return (0, response_1.errorResponse)(400, 'Already added in following list.');
        }
        (user.followings).push(body.user);
        const saveUser = await user.save();
        (following.followers).push(userId);
        const saveFollowing = await following.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async deleteFollower(userId, followerId) {
        const user = await this.userModal.findById(userId);
        const follower = await this.userModal.findById(followerId);
        if (!follower)
            return (0, response_1.errorResponse)(404, 'Follower not exist.');
        const findFollowerIndex = (user.followers || []).findIndex((follower) => follower.toString() === followerId);
        if (findFollowerIndex === -1) {
            return (0, response_1.errorResponse)(404, 'Follower not exist.');
        }
        user.followers = (user.followers || []).filter((follower) => (follower).toString() !== followerId.toString());
        const saveUser = await user.save();
        follower.followings = (follower.followings || [])
            .filter((following) => (following).toString() !== userId.toString());
        await follower.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async deleteFollowing(userId, followingId) {
        const user = await this.userModal.findById(userId);
        const following = await this.userModal.findById(followingId);
        if (!following)
            return (0, response_1.errorResponse)(404, 'Follower not exist.');
        const findFollowingIndex = (user.followings || []).findIndex((following) => following.toString() === followingId.toString());
        if (findFollowingIndex === -1) {
            return (0, response_1.errorResponse)(404, 'Following not exist.');
        }
        user.followings = (user.followings || []).filter((following) => (following).toString() !== followingId.toString());
        const saveUser = await user.save();
        following.followers = (following.followers || [])
            .filter((follower) => (follower).toString() !== userId.toString());
        await following.save();
        return (0, response_1.successResponse)(200, 'post', saveUser);
    }
    async getUserById(userId) {
        const user = await this.userModal.aggregate([
            { $match: { _id: new mongoose_2.default.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "goals",
                    let: { user: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$user', new mongoose_2.default.Types.ObjectId(userId)] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'goals'
                },
            },
            {
                $lookup: {
                    from: "posts",
                    let: { user: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$user', new mongoose_2.default.Types.ObjectId(userId)] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'posts'
                },
            }
        ]);
        await this.userModal.populate(user, { path: "followers", select: "firstName lastName email avatar" });
        await this.userModal.populate(user, { path: "followings", select: "firstName lastName email avatar" });
        await this.userModal.populate(user, { path: "savedArticles" });
        await this.userModal.populate(user, { path: "savedPosts" });
        if (!user || user.length === 0) {
            return (0, response_1.errorResponse)(404, 'User not exist.');
        }
        return (0, response_1.successResponse)(200, 'user', user[0]);
    }
    async deleteUser(userId) {
        const user = await this.userModal.findByIdAndRemove(userId);
        return (0, response_1.successResponse)(200, 'user deleted', user);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map