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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNewsletterSubscriptionStatusRequest = exports.CreateNewsletterSubscriptionDto = exports.CreatePostFilterDto = exports.CreateNewsletterComment = exports.CreateArticleDto = exports.CreateNewsLetterDto = void 0;
const class_validator_1 = require("class-validator");
const posts_enum_1 = require("../../enums/posts.enum");
const newsletter_enum_1 = require("../../enums/newsletter.enum");
class CreateNewsLetterDto {
}
exports.CreateNewsLetterDto = CreateNewsLetterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateNewsLetterDto.prototype, "title", void 0);
class CreateArticleDto {
}
exports.CreateArticleDto = CreateArticleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateArticleDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateArticleDto.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateArticleDto.prototype, "time", void 0);
class CreateNewsletterComment {
}
exports.CreateNewsletterComment = CreateNewsletterComment;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateNewsletterComment.prototype, "message", void 0);
class CreatePostFilterDto {
}
exports.CreatePostFilterDto = CreatePostFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(posts_enum_1.PostCategoryEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(posts_enum_1.PostTypeEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(posts_enum_1.OrderByEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "order_by", void 0);
class CreateNewsletterSubscriptionDto {
}
exports.CreateNewsletterSubscriptionDto = CreateNewsletterSubscriptionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateNewsletterSubscriptionDto.prototype, "user", void 0);
class UpdateNewsletterSubscriptionStatusRequest {
}
exports.UpdateNewsletterSubscriptionStatusRequest = UpdateNewsletterSubscriptionStatusRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(newsletter_enum_1.NewsLetterSubscriptionRequestsType),
    __metadata("design:type", Object)
], UpdateNewsletterSubscriptionStatusRequest.prototype, "request_state", void 0);
//# sourceMappingURL=newsletter.dto.js.map