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
exports.NewsLetterCommentSchema = exports.NewsLetterComment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../users/user.schema");
let NewsLetterComment = exports.NewsLetterComment = class NewsLetterComment {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], NewsLetterComment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'NewsLetters' }),
    __metadata("design:type", Object)
], NewsLetterComment.prototype, "newsletter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", Object)
], NewsLetterComment.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Object)
], NewsLetterComment.prototype, "date_created", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                message: { type: String, default: "" },
                date_created: { type: Date, default: Date.now },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Object)
], NewsLetterComment.prototype, "replies", void 0);
exports.NewsLetterComment = NewsLetterComment = __decorate([
    (0, mongoose_1.Schema)()
], NewsLetterComment);
exports.NewsLetterCommentSchema = mongoose_1.SchemaFactory.createForClass(NewsLetterComment);
//# sourceMappingURL=comments.model.js.map