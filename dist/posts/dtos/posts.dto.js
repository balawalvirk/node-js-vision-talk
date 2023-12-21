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
exports.UpdatePostDto = exports.SavePostDto = exports.CreatePostFilterDto = exports.CreatePostComment = exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
const posts_enum_1 = require("../../enums/posts.enum");
const class_transformer_1 = require("class-transformer");
class CreatePostDto {
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreatePostDto.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(posts_enum_1.PostCategoryEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePostDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(posts_enum_1.PostTypeEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePostDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], CreatePostDto.prototype, "is_created_by_admin", void 0);
class CreatePostComment {
}
exports.CreatePostComment = CreatePostComment;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreatePostComment.prototype, "message", void 0);
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
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "allCategories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "is_created_by_admin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreatePostFilterDto.prototype, "perPage", void 0);
class SavePostDto {
}
exports.SavePostDto = SavePostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SavePostDto.prototype, "post", void 0);
class UpdatePostDto {
}
exports.UpdatePostDto = UpdatePostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePostDto.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(posts_enum_1.PostCategoryEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePostDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(posts_enum_1.PostTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePostDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], UpdatePostDto.prototype, "is_created_by_admin", void 0);
//# sourceMappingURL=posts.dto.js.map