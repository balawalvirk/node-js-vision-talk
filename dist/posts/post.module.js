"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_model_1 = require("./models/posts.model");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const user_schema_1 = require("../users/user.schema");
const likes_model_1 = require("./models/likes.model");
const comments_model_1 = require("./models/comments.model");
const goals_service_1 = require("../goals/goals.service");
const goal_schema_1 = require("../goals/goal.schema");
let PostModule = exports.PostModule = class PostModule {
};
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'posts', schema: posts_model_1.PostSchema },
                { name: "User", schema: user_schema_1.UserSchema },
                { name: "post-likes", schema: likes_model_1.PostLikeSchema },
                { name: "post-comments", schema: comments_model_1.PostCommentSchema },
                { name: goal_schema_1.Goal.name, schema: goal_schema_1.GoalSchema }
            ]),
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, goals_service_1.GoalsService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map