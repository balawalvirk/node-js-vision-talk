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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_1 = require("../utils/response");
const user_schema_1 = require("../users/user.schema");
const posts_enum_1 = require("../enums/posts.enum");
let PostService = exports.PostService = class PostService {
    constructor(postsModel, usersModel, postLikeModel, postCommentsModel) {
        this.postsModel = postsModel;
        this.usersModel = usersModel;
        this.postLikeModel = postLikeModel;
        this.postCommentsModel = postCommentsModel;
    }
    async create(body, fileName, user) {
        const post = new this.postsModel(Object.assign(Object.assign({}, body), { image: fileName, user }));
        const savePost = await post.save();
        return (0, response_1.successResponse)(200, 'post created', savePost);
    }
    async getAllPosts(userId, type) {
        const post = await this.postsModel.aggregate([
            { $match: { type } },
            {
                $lookup: {
                    from: "post-likes",
                    let: { post: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$post', '$$post'] },
                                        { $eq: ['$user', userId] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $addFields: {
                    own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } }
                }
            },
            { $unset: ["like_data"] }
        ]);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        await this.postsModel.populate(post, { path: "user", select: "firstName lastName email avatar" });
        return (0, response_1.successResponse)(200, 'post', post);
    }
    async getUserPosts(userId) {
        const post = await this.postsModel.aggregate([
            { $match: { user: new mongoose_2.default.Types.ObjectId(userId) } },
        ]);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        return (0, response_1.successResponse)(200, 'post', post);
    }
    async getPostDetails(userId, postId, type) {
        const post = await this.postsModel.aggregate([
            { $match: { _id: new mongoose_2.default.Types.ObjectId(postId), type } },
            {
                $lookup: {
                    from: 'post-comments',
                    localField: '_id',
                    foreignField: 'post',
                    as: 'comments',
                },
            },
            {
                $lookup: {
                    from: "post-likes",
                    let: { post: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$post', '$$post'] },
                                        { $eq: ['$user', userId] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $addFields: {
                    own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } }
                }
            },
            { $unset: ["like_data"] }
        ]);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        await this.postsModel.populate(post, { path: "user", select: "firstName lastName email avatar" });
        await this.postsModel.populate(post, { path: "comments.user", model: "User", select: "firstName lastName email avatar" });
        await this.postsModel.populate(post, { path: "comments.replies.user", model: "User", select: "firstName lastName email avatar" });
        return (0, response_1.successResponse)(200, 'post', post);
    }
    async getFilteredPosts(userId, body) {
        let query = {};
        if (body.category)
            query = Object.assign(Object.assign({}, query), { category: body.category });
        if (body.type)
            query = Object.assign(Object.assign({}, query), { type: body.type });
        const post = await this.postsModel.aggregate([
            { $match: Object.assign({}, query) },
            {
                $lookup: {
                    from: "post-likes",
                    let: { post: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$post', '$$post'] },
                                        { $eq: ['$user', userId] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $addFields: {
                    own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } }
                }
            },
            { $unset: ["like_data"] },
            { $sort: { date_created: (body.order_by || posts_enum_1.OrderByEnum.DESCENDING) === posts_enum_1.OrderByEnum.DESCENDING ? -1 : 1 } }
        ]);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        await this.postsModel.populate(post, { path: "user", select: "firstName lastName email avatar" });
        return (0, response_1.successResponse)(200, 'post', post);
    }
    async postComment(body, user, postId) {
        const post = await this.postsModel.findById(postId);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        post.comments_count = post.comments_count + 1;
        await post.save();
        const postComment = new this.postCommentsModel(Object.assign(Object.assign({}, body), { user, post: postId }));
        const savePostComment = await postComment.save();
        return (0, response_1.successResponse)(200, 'comment created', savePostComment);
    }
    async replyPostComment(body, user, postId, commentId) {
        const post = await this.postsModel.findById(postId);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        const postComment = await this.postCommentsModel.findById(commentId);
        if (!postComment)
            return (0, response_1.errorResponse)(404, 'post comment not found');
        postComment.replies.push(Object.assign(Object.assign({}, body), { user }));
        const savePostComment = await postComment.save();
        return (0, response_1.successResponse)(200, 'reply saved', savePostComment);
    }
    async postLike(user, postId) {
        const post = await this.postsModel.findById(postId);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        const postLike = await this.postLikeModel.findOne({ user, post: postId });
        if (postLike)
            return (0, response_1.errorResponse)(400, 'already liked this post');
        post.likes_count = post.likes_count + 1;
        await post.save();
        const createPostLike = new this.postLikeModel({ user, post: postId });
        const savePostLike = await createPostLike.save();
        return (0, response_1.successResponse)(200, 'post like created', savePostLike);
    }
    async postDisLike(user, postId) {
        const post = await this.postsModel.findById(postId);
        if (!post)
            return (0, response_1.errorResponse)(404, 'post not found');
        const postLike = await this.postLikeModel.findOneAndRemove({ user, post: postId });
        if (!postLike)
            return (0, response_1.errorResponse)(404, 'post like not found');
        post.likes_count = post.likes_count - 1;
        await post.save();
        return (0, response_1.successResponse)(200, 'post like removed', postLike);
    }
};
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('posts')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)("post-likes")),
    __param(3, (0, mongoose_1.InjectModel)("post-comments")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostService);
//# sourceMappingURL=post.service.js.map