"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
const newsletter_model_1 = require("./models/newsletter.model");
const likes_model_1 = require("./models/likes.model");
const comments_model_1 = require("./models/comments.model");
const subscriptions_model_1 = require("./models/subscriptions.model");
const newsletter_controller_1 = require("./newsletter.controller");
const newsletter_service_1 = require("./newsletter.service");
let NewsletterModule = exports.NewsletterModule = class NewsletterModule {
};
exports.NewsletterModule = NewsletterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_schema_1.UserSchema },
                { name: 'newsletters', schema: newsletter_model_1.NewsLetterSchema },
                { name: "newsletter-likes", schema: likes_model_1.NewsLetterLikeSchema },
                { name: "newsletter-comments", schema: comments_model_1.NewsLetterCommentSchema },
                { name: "newsletter-subscriptions-requests", schema: subscriptions_model_1.NewsletterSubscriptionsSchema },
            ]),
        ],
        controllers: [newsletter_controller_1.NewsletterController],
        providers: [newsletter_service_1.NewsletterService],
    })
], NewsletterModule);
//# sourceMappingURL=newsletter.module.js.map