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
exports.ChatSchema = exports.Chat = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const chat_enum_1 = require("../../enums/chat.enum");
let Chat = exports.Chat = class Chat {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId }),
    __metadata("design:type", Object)
], Chat.prototype, "session_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId }),
    __metadata("design:type", Object)
], Chat.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", Object)
], Chat.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: chat_enum_1.ChatMessageTypeEnum, default: chat_enum_1.ChatMessageTypeEnum.DEFAULT }),
    __metadata("design:type", Object)
], Chat.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Object)
], Chat.prototype, "date_created", void 0);
exports.Chat = Chat = __decorate([
    (0, mongoose_1.Schema)()
], Chat);
exports.ChatSchema = mongoose_1.SchemaFactory.createForClass(Chat);
//# sourceMappingURL=chat.model.js.map