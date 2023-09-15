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
exports.NewsletterSubscriptionsSchema = exports.NewsletterSubscriptions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../users/user.schema");
const newsletter_enum_1 = require("../../enums/newsletter.enum");
let NewsletterSubscriptions = exports.NewsletterSubscriptions = class NewsletterSubscriptions {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], NewsletterSubscriptions.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], NewsletterSubscriptions.prototype, "receiver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'newsLetters' }),
    __metadata("design:type", Object)
], NewsletterSubscriptions.prototype, "newsletter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: newsletter_enum_1.NewsLetterSubscriptionRequestsType, default: newsletter_enum_1.NewsLetterSubscriptionRequestsType.INITIATED }),
    __metadata("design:type", Object)
], NewsletterSubscriptions.prototype, "request_state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Object)
], NewsletterSubscriptions.prototype, "date_created", void 0);
exports.NewsletterSubscriptions = NewsletterSubscriptions = __decorate([
    (0, mongoose_1.Schema)()
], NewsletterSubscriptions);
exports.NewsletterSubscriptionsSchema = mongoose_1.SchemaFactory.createForClass(NewsletterSubscriptions);
//# sourceMappingURL=subscriptions.model.js.map