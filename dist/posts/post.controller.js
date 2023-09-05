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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const posts_dto_1 = require("./dtos/posts.dto");
const post_service_1 = require("./post.service");
const FileUploadToS3_1 = require("../utils/FileUploadToS3");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PostController = exports.PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(file, body, req) {
        const response = await this.postService.create(body, file.location, req.user._id);
        return response;
    }
    async getPostDetails(id, type, req) {
        const response = await this.postService.getPostDetails(req.user._id, id, type);
        return response;
    }
    async getAllPosts(id, type, req) {
        const response = await this.postService.getAllPosts(req.user._id, type);
        return response;
    }
    async getAllUserPosts(id, type, req) {
        const response = await this.postService.getUserPosts(req.user._id);
        return response;
    }
    async postComment(body, postId, req) {
        const response = await this.postService.postComment(body, req.user._id, postId);
        return response;
    }
    async postCommentReply(body, postId, commentId, req) {
        const response = await this.postService.replyPostComment(body, req.user._id, postId, commentId);
        return response;
    }
    async createPostLike(postId, req) {
        const response = await this.postService.postLike(req.user._id, postId);
        return response;
    }
    async createPostDislike(postId, req) {
        const response = await this.postService.postDisLike(req.user._id, postId);
        return response;
    }
    async filteredPost(body, req) {
        const response = await this.postService.getFilteredPosts(req.user._id, body);
        return response;
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: true,
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, posts_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:id/type/:type/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostDetails", null);
__decorate([
    (0, common_1.Get)('/type/:type/all'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllUserPosts", null);
__decorate([
    (0, common_1.Post)('/:postId/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.CreatePostComment, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "postComment", null);
__decorate([
    (0, common_1.Post)('/:postId/comment/:commentId/reply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Param)('commentId')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.CreatePostComment, String, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "postCommentReply", null);
__decorate([
    (0, common_1.Post)('/:postId/like'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPostLike", null);
__decorate([
    (0, common_1.Post)('/:postId/dislike'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPostDislike", null);
__decorate([
    (0, common_1.Post)('/filtered-posts'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.CreatePostFilterDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "filteredPost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map