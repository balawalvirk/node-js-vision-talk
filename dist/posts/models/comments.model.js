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
exports.PostCommentSchema = exports.PostComment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../users/user.schema");
const posts_model_1 = require("./posts.model");
let PostComment = exports.PostComment = class PostComment {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], PostComment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'posts' }),
    __metadata("design:type", posts_model_1.Post)
], PostComment.prototype, "post", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", Object)
], PostComment.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Object)
], PostComment.prototype, "date_created", void 0);
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
], PostComment.prototype, "replies", void 0);
exports.PostComment = PostComment = __decorate([
    (0, mongoose_1.Schema)()
], PostComment);
exports.PostCommentSchema = mongoose_1.SchemaFactory.createForClass(PostComment);
//# sourceMappingURL=comments.model.js.map