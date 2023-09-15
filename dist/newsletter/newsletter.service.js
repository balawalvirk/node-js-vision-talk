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
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_1 = require("../utils/response");
const user_schema_1 = require("../users/user.schema");
const newsletter_enum_1 = require("../enums/newsletter.enum");
let NewsletterService = exports.NewsletterService = class NewsletterService {
    constructor(newsletterModel, usersModel, newslettersLikeModel, newsletterCommentsModel, newsletterSubscriptionRequestsModel) {
        this.newsletterModel = newsletterModel;
        this.usersModel = usersModel;
        this.newslettersLikeModel = newslettersLikeModel;
        this.newsletterCommentsModel = newsletterCommentsModel;
        this.newsletterSubscriptionRequestsModel = newsletterSubscriptionRequestsModel;
    }
    async create(body, fileName, user) {
        const newsletter = new this.newsletterModel(Object.assign(Object.assign({}, body), { image: fileName, user }));
        const saveNewsletter = await newsletter.save();
        return (0, response_1.successResponse)(200, 'newsletter created', saveNewsletter);
    }
    async getAllNewsPapers(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            {
                $lookup: {
                    from: "newsletter-likes",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$user', userId] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$receiver', userId] },
                                        { $eq: ['$request_state', newsletter_enum_1.NewsLetterSubscriptionRequestsType.ACCEPTED] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'subscriptions'
                },
            },
            {
                $addFields: {
                    own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } },
                    subscribed: { $cond: { if: { $gt: [{ $size: "$subscriptions" }, 0] }, then: true, else: false } }
                }
            },
            { $unset: ["like_data", "subscriptions"] }
        ]);
        if (!newsletters)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        await this.newsletterModel.populate(newsletters, { path: "user", select: "firstName lastName email avatar" });
        return (0, response_1.successResponse)(200, 'newsletters', newsletters);
    }
    async getUserNewsLetters(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            { $match: { user: new mongoose_2.default.Types.ObjectId(userId) } },
        ]);
        return (0, response_1.successResponse)(200, 'newsletter', newsletters);
    }
    async getNewsLetterDetails(userId, newspaperId) {
        const newsletters = await this.newsletterModel.aggregate([
            { $match: { _id: new mongoose_2.default.Types.ObjectId(newspaperId) } },
            {
                $lookup: {
                    from: 'newsletter-comments',
                    localField: '_id',
                    foreignField: 'newsletter',
                    as: 'comments',
                },
            },
            {
                $lookup: {
                    from: "newsletter-likes",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$user', userId] }
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: {
                        newsletter: '$_id',
                        request_state: newsletter_enum_1.NewsLetterSubscriptionRequestsType.ACCEPTED,
                        receiver: userId
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$request_state', '$$request_state'] },
                                        { $eq: ['$receiver', '$$receiver'] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'subscriptions'
                },
            },
            {
                $addFields: {
                    own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } },
                    subscribed: { $cond: { if: { $gt: [{ $size: "$subscriptions" }, 0] }, then: true, else: false } }
                }
            },
            { $unset: ["like_data", "subscriptions"] }
        ]);
        if (!newsletters)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        await this.newsletterModel.populate(newsletters, { path: "user", select: "firstName lastName email avatar" });
        await this.newsletterModel.populate(newsletters, {
            path: "comments.user",
            model: "User",
            select: "firstName lastName email avatar"
        });
        await this.newsletterModel.populate(newsletters, {
            path: "comments.replies.user",
            model: "User",
            select: "firstName lastName email avatar"
        });
        return (0, response_1.successResponse)(200, 'newsletters', newsletters);
    }
    async postComment(body, user, newsletterId) {
        const newsletter = await this.newsletterModel.findById(newsletterId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        newsletter.comments_count = newsletter.comments_count + 1;
        await newsletter.save();
        const postComment = new this.newsletterCommentsModel(Object.assign(Object.assign({}, body), { user, newsletter: newsletterId }));
        const savePostComment = await postComment.save();
        return (0, response_1.successResponse)(200, 'comment created', savePostComment);
    }
    async replyPostComment(body, user, newsletterId, commentId) {
        const newsletter = await this.newsletterModel.findById(newsletterId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        const newsletterComment = await this.newsletterCommentsModel.findById(commentId);
        if (!newsletterComment)
            return (0, response_1.errorResponse)(404, 'newsletter comment not found');
        newsletterComment.replies.push(Object.assign(Object.assign({}, body), { user }));
        const savePostComment = await newsletterComment.save();
        return (0, response_1.successResponse)(200, 'reply saved', savePostComment);
    }
    async postNewsletterLike(user, newsletterId) {
        const newsletter = await this.newsletterModel.findById(newsletterId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        const newsletterLike = await this.newslettersLikeModel.findOne({ user, newsletter: newsletterId });
        if (newsletterLike)
            return (0, response_1.errorResponse)(400, 'already liked this post');
        newsletter.likes_count = newsletter.likes_count + 1;
        await newsletter.save();
        const createNewsletterLike = new this.newslettersLikeModel({ user, newsletter: newsletterId });
        const saveNewspaperLike = await createNewsletterLike.save();
        return (0, response_1.successResponse)(200, 'newsletter like created', saveNewspaperLike);
    }
    async createNewsletterDislike(user, newsletterId) {
        const newsletter = await this.newsletterModel.findById(newsletterId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        const newsletterLike = await this.newslettersLikeModel.findOneAndRemove({ user, newsletter: newsletterId });
        if (!newsletterLike)
            return (0, response_1.errorResponse)(404, 'newsletter like not found');
        newsletter.likes_count = newsletter.likes_count - 1;
        await newsletter.save();
        return (0, response_1.successResponse)(200, 'newsletter like removed', newsletterLike);
    }
    async createNewsLetterSubscriptionRequests(senderId, newsletterId, body) {
        const newsletterRequest = await this.newsletterSubscriptionRequestsModel
            .findOne({
            sender: new mongoose_2.default.Types.ObjectId(senderId),
            newsletter: new mongoose_2.default.Types.ObjectId(newsletterId),
            receiver: new mongoose_2.default.Types.ObjectId(body.user)
        });
        if (newsletterRequest)
            return (0, response_1.errorResponse)(404, 'request is already sent');
        const newsletterSubscriptionRequest = await this.newsletterSubscriptionRequestsModel
            .create({ sender: senderId, receiver: body.user, newsletter: newsletterId });
        return (0, response_1.successResponse)(200, 'new request created', newsletterSubscriptionRequest);
    }
    async updateNewsLetterSubscriptionRequest(newsletterId, body) {
        const newsletterRequest = await this.newsletterSubscriptionRequestsModel.findById(newsletterId);
        if (!newsletterRequest)
            return (0, response_1.errorResponse)(404, 'request not found');
        newsletterRequest.request_state = body.request_state;
        return (0, response_1.successResponse)(200, 'request status updated', newsletterRequest);
    }
    async getAllSubscriptionRequests(userId) {
        const sent = await this.newsletterSubscriptionRequestsModel.find({ sender: userId })
            .populate("receiver", "firstName lastName email avatar")
            .sort({ "date_created": -1 });
        const received = await this.newsletterSubscriptionRequestsModel.find({ receiver: userId })
            .populate("sender", "firstName lastName email avatar")
            .sort({ "date_created": -1 });
        return (0, response_1.successResponse)(200, 'request status updated', { sent, received });
    }
};
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('newsletters')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)("newsletter-likes")),
    __param(3, (0, mongoose_1.InjectModel)("newsletter-comments")),
    __param(4, (0, mongoose_1.InjectModel)("newsletter-subscriptions-requests")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map