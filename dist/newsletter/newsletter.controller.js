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
exports.NewsletterController = void 0;
const common_1 = require("@nestjs/common");
const FileUploadToS3_1 = require("../utils/FileUploadToS3");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const newsletter_service_1 = require("./newsletter.service");
const newsletter_dto_1 = require("./dtos/newsletter.dto");
let NewsletterController = exports.NewsletterController = class NewsletterController {
    constructor(newsletterService) {
        this.newsletterService = newsletterService;
    }
    async create(file, body, req) {
        const response = await this.newsletterService.createNewsLetter(body, file.location, req.user._id);
        return response;
    }
    async update(file, body, req) {
        const response = await this.newsletterService.updateNewsLetter(body, file && file.location, req.params.id);
        return response;
    }
    async delete(file, req) {
        const response = await this.newsletterService.deleteById(req.params.id);
        return response;
    }
    async deleteArticle(file, req) {
        const response = await this.newsletterService.deleteArticleById(req.params.id);
        return response;
    }
    async createArticle(file, body, req) {
        const response = await this.newsletterService.createArticle(body, file.location, req.user._id, req.params.id);
        return response;
    }
    async updateArticle(file, body, req) {
        const response = await this.newsletterService.updateArticle(body, file === null || file === void 0 ? void 0 : file.location, req.user._id, req.params.id, req.params.articleId);
        return response;
    }
    async getNewsLetterById(id, type, req) {
        const response = await this.newsletterService.getNewsLetterById(req.user._id, id);
        return response;
    }
    async getArticleDetails(id, type, req) {
        const response = await this.newsletterService.getArticleDetails(req.user._id, id);
        return response;
    }
    async getAllNewsletters(req) {
        const response = await this.newsletterService.getAllNewsPapers(req.user._id);
        return response;
    }
    async getAllArticles(req) {
        const response = await this.newsletterService.getAllArticles(req.user._id);
        return response;
    }
    async getAllUserNewsletters(id, type, req) {
        const response = await this.newsletterService.getUserNewsLetters(req.user._id);
        return response;
    }
    async postComment(body, articleId, req) {
        const response = await this.newsletterService.postComment(body, req.user._id, articleId);
        return response;
    }
    async postCommentReply(body, articleId, commentId, req) {
        const response = await this.newsletterService.replyPostComment(body, req.user._id, articleId, commentId);
        return response;
    }
    async createNewsletterLike(articleId, req) {
        const response = await this.newsletterService.postNewsletterLike(req.user._id, articleId);
        return response;
    }
    async createNewsletterDislike(articleId, req) {
        const response = await this.newsletterService.createNewsletterDislike(req.user._id, articleId);
        return response;
    }
    async subscribeNewsletter(body, newsletterId, req) {
        const response = await this.newsletterService.createNewsLetterSubscription(req.user._id, newsletterId, body);
        return response;
    }
    async createNewsletterSubscription(body, newsletterId, req) {
        const response = await this.newsletterService.createNewsLetterSubscriptionRequests(req.user._id, newsletterId, body);
        return response;
    }
    async updateNewsletterSubscriptionStatus(body, newsletterSubscriptionId, req) {
        const response = await this.newsletterService.updateNewsLetterSubscriptionRequest(newsletterSubscriptionId, body);
        return response;
    }
    async getAllSubscriptions(req) {
        const response = await this.newsletterService.getAllSubscriptionRequests(req.user._id);
        return response;
    }
    async getAllSubscribedNewsletters(req) {
        const response = await this.newsletterService.getAllSubscribedNewsletters(req.user._id);
        return response;
    }
    async saveArticle(body, req) {
        const response = await this.newsletterService.saveArticle(req.user._id, body);
        return response;
    }
    async removeSavedArticle(id, req) {
        const response = await this.newsletterService.removeSaveArticle(req.user._id, id);
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
    __metadata("design:paramtypes", [Object, newsletter_dto_1.CreateNewsLetterDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, newsletter_dto_1.UpdateNewsLetterDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('/article/:id'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Post)('/:id/article'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: true,
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, newsletter_dto_1.CreateArticleDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "createArticle", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Put)('/:id/article/:articleId'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, newsletter_dto_1.UpdateArticleDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Get)('/:id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getNewsLetterById", null);
__decorate([
    (0, common_1.Get)('/article/:id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getArticleDetails", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getAllNewsletters", null);
__decorate([
    (0, common_1.Get)('/articles/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getAllArticles", null);
__decorate([
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getAllUserNewsletters", null);
__decorate([
    (0, common_1.Post)('/article/:articleId/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('articleId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsletter_dto_1.CreateNewsletterComment, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "postComment", null);
__decorate([
    (0, common_1.Post)('/article/:articleId/comment/:commentId/reply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('articleId')),
    __param(2, (0, common_1.Param)('commentId')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsletter_dto_1.CreateNewsletterComment, String, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "postCommentReply", null);
__decorate([
    (0, common_1.Post)('/article/:articleId/like'),
    __param(0, (0, common_1.Param)('articleId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "createNewsletterLike", null);
__decorate([
    (0, common_1.Post)('/article/:articleId/dislike'),
    __param(0, (0, common_1.Param)('articleId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "createNewsletterDislike", null);
__decorate([
    (0, common_1.Post)('/:newsletterId/subscribe'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('newsletterId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsletter_dto_1.CreateNewsletterSubscriptionDto, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "subscribeNewsletter", null);
__decorate([
    (0, common_1.Post)('/:newsletterId/subscription/invite'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('newsletterId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsletter_dto_1.CreateNewsletterSubscriptionDto, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "createNewsletterSubscription", null);
__decorate([
    (0, common_1.Put)('/subscription/:newsletterSubscriptionId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('newsletterSubscriptionId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsletter_dto_1.UpdateNewsletterSubscriptionStatusRequest, String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "updateNewsletterSubscriptionStatus", null);
__decorate([
    (0, common_1.Get)('/subscription'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getAllSubscriptions", null);
__decorate([
    (0, common_1.Get)('/subscribed'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "getAllSubscribedNewsletters", null);
__decorate([
    (0, common_1.Post)('/article/save'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newsletter_dto_1.SaveArticleDto, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "saveArticle", null);
__decorate([
    (0, common_1.Delete)('/article/:id/save'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "removeSavedArticle", null);
exports.NewsletterController = NewsletterController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('newsletter'),
    __metadata("design:paramtypes", [newsletter_service_1.NewsletterService])
], NewsletterController);
//# sourceMappingURL=newsletter.controller.js.map