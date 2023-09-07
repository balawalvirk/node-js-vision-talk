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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const posts_dto_1 = require("../posts/dtos/posts.dto");
const FileUploadToS3_1 = require("../utils/FileUploadToS3");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const response_1 = require("../utils/response");
const chat_service_1 = require("./chat.service");
const chat_dto_1 = require("./dto/chat.dto");
let ChatController = exports.ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async create(file, body, req) {
        return (0, response_1.successResponse)(200, 'file created', { file: file.location });
    }
    async createChat(body, req) {
        const response = await this.chatService.create(req.user._id, body);
        return response;
    }
    async createChatSesson(body, req) {
        const response = await this.chatService.createSession(req.user._id, body);
        return response;
    }
    async getContactsList(req) {
        const response = await this.chatService.getContacts((req.user._id).toString());
        return response;
    }
    async getChatMessage(sessionId) {
        const response = await this.chatService.getChatMessage(sessionId);
        return response;
    }
    async createGroupMessage(body, postId, req) {
        const response = await this.chatService.createGroupMessage(req.user._id, body);
        return response;
    }
    async createGroup(file, body, req) {
        const response = await this.chatService.createGroup(req.user._id, body, file.location);
        return response;
    }
    async getUserGroups(req) {
        const response = await this.chatService.getUserGroups((req.user._id).toString());
        return response;
    }
    async getGroupMessages(sessionId) {
        const response = await this.chatService.getGroupMessage(sessionId);
        return response;
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Post)('/file'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: true,
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, posts_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/contact-message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.CreateChatDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Post)('/session'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.CreateSessionDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChatSesson", null);
__decorate([
    (0, common_1.Get)('/contacts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getContactsList", null);
__decorate([
    (0, common_1.Get)('/messages/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatMessage", null);
__decorate([
    (0, common_1.Post)('/group-message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_dto_1.CreateGroupMessageDto, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createGroupMessage", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: FileUploadToS3_1.default.uploadFile() })),
    (0, common_1.Post)('/group'),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ fileIsRequired: true, }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_dto_1.CreateGroupDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)('/group'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUserGroups", null);
__decorate([
    (0, common_1.Get)('/group-messages/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getGroupMessages", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map