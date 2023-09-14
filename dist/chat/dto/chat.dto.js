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
exports.AddRemoveUserGroupDto = exports.CreateGroupDto = exports.CreateSessionDto = exports.CreateGroupMessageDto = exports.CreateChatDto = void 0;
const class_validator_1 = require("class-validator");
const chat_enum_1 = require("../../enums/chat.enum");
const class_transformer_1 = require("class-transformer");
class CreateChatDto {
}
exports.CreateChatDto = CreateChatDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "sessionId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(chat_enum_1.ChatMessageTypeEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateChatDto.prototype, "type", void 0);
class CreateGroupMessageDto {
}
exports.CreateGroupMessageDto = CreateGroupMessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateGroupMessageDto.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateGroupMessageDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(chat_enum_1.ChatMessageTypeEnum),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateGroupMessageDto.prototype, "type", void 0);
class CreateSessionDto {
}
exports.CreateSessionDto = CreateSessionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateSessionDto.prototype, "contact", void 0);
class CreateGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => JSON.parse(value)),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "users", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateGroupDto.prototype, "name", void 0);
class AddRemoveUserGroupDto {
}
exports.AddRemoveUserGroupDto = AddRemoveUserGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], AddRemoveUserGroupDto.prototype, "userId", void 0);
//# sourceMappingURL=chat.dto.js.map