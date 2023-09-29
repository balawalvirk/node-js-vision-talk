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
    constructor(newsletterModel, articleModel, usersModel, newslettersLikeModel, newsletterCommentsModel, newsletterSubscriptionRequestsModel) {
        this.newsletterModel = newsletterModel;
        this.articleModel = articleModel;
        this.usersModel = usersModel;
        this.newslettersLikeModel = newslettersLikeModel;
        this.newsletterCommentsModel = newsletterCommentsModel;
        this.newsletterSubscriptionRequestsModel = newsletterSubscriptionRequestsModel;
    }
    async createNewsLetter(body, fileName, user) {
        const newsletter = new this.newsletterModel(Object.assign(Object.assign({}, body), { image: fileName, user }));
        const saveNewsletter = await newsletter.save();
        return (0, response_1.successResponse)(200, 'newsletter created', saveNewsletter);
    }
    async createArticle(body, fileName, user, newspaperId) {
        const newsletter = await this.newsletterModel.findById(newspaperId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        const newsletterArticle = new this.articleModel(Object.assign(Object.assign({}, body), { image: fileName, user, newsletter: newspaperId }));
        const saveNewsletterArticle = await newsletterArticle.save();
        return (0, response_1.successResponse)(200, 'article created', saveNewsletterArticle);
    }
    async getAllNewsPapers(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            {
                $lookup: {
                    from: "articles",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] }
                                    ]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: "newsletter-likes",
                                let: { article: '$_id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$article', '$$article'] },
                                                    { $eq: ['$user', userId] }
                                                ]
                                            }
                                        }
                                    }
                                ],
                                as: 'like_data'
                            },
                        },
                        {
                            $addFields: {
                                own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } }
                            }
                        },
                        { $unset: ["like_data"] }
                    ],
                    as: 'articles'
                },
            },
            { "$unwind": "$articles" },
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
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$request_state', newsletter_enum_1.NewsLetterSubscriptionRequestsType.ACCEPTED] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'all_subscriptions'
                },
            },
            {
                $addFields: {
                    subscribed: { $cond: { if: { $gt: [{ $size: "$subscriptions" }, 0] }, then: true, else: false } },
                    subscriptions_count: { $size: "$all_subscriptions" }
                }
            },
            { $unset: ["subscriptions", "all_subscriptions"] }
        ]);
        if (!newsletters)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        await this.newsletterModel.populate(newsletters, { path: "user", select: "firstName lastName email avatar" });
        return (0, response_1.successResponse)(200, 'newsletters', newsletters);
    }
    async getNewsLetterById(userId, newsLetterId) {
        const newsletters = await this.newsletterModel.aggregate([
            { $match: { _id: new mongoose_2.default.Types.ObjectId(newsLetterId) } },
            {
                $lookup: {
                    from: "articles",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] }
                                    ]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: "newsletter-likes",
                                let: { article: '$_id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$article', '$$article'] },
                                                    { $eq: ['$user', userId] }
                                                ]
                                            }
                                        }
                                    }
                                ],
                                as: 'like_data'
                            },
                        },
                        {
                            $addFields: {
                                own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } }
                            }
                        },
                        { $unset: ["like_data"] }
                    ],
                    as: 'articles'
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
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$request_state', newsletter_enum_1.NewsLetterSubscriptionRequestsType.ACCEPTED] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'all_subscriptions'
                },
            },
            {
                $addFields: {
                    subscribed: { $cond: { if: { $gt: [{ $size: "$subscriptions" }, 0] }, then: true, else: false } },
                    subscriptions_count: { $size: "$all_subscriptions" }
                }
            },
            { $unset: ["subscriptions", "all_subscriptions"] }
        ]);
        if (!newsletters)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        await this.newsletterModel.populate(newsletters, { path: "user", select: "firstName lastName email avatar" });
        return (0, response_1.successResponse)(200, 'newsletters', newsletters);
    }
    async getUserNewsLetters(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            { $match: { user: new mongoose_2.default.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "articles",
                    let: { newsletter: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] }
                                    ]
                                }
                            },
                        }
                    ],
                    as: 'articles'
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
                    subscription_count: { $size: "$subscriptions" }
                }
            },
            { $unset: ["subscriptions"] }
        ]);
        return (0, response_1.successResponse)(200, 'newsletter', newsletters);
    }
    async getAllArticles(userId) {
        const newsletters = await this.articleModel.aggregate([
            {
                $lookup: {
                    from: "newsletters",
                    let: { newsletter: '$newsletter' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$newsletter'] },
                                    ]
                                }
                            },
                        },
                        {
                            "$lookup": {
                                "from": "users",
                                "let": { "userId": "$user" },
                                "pipeline": [
                                    { "$match": { "$expr": { "$eq": ["$_id", "$$userId"] } } },
                                    { "$project": { "firstName": 1, "lastName": 1, "email": 1, _id: 1, avatar: 1,
                                            followers: 1, followings: 1 } },
                                    {
                                        $addFields: {
                                            followers_count: { $size: "$followers" },
                                            followings_count: { $size: "$followings" }
                                        }
                                    }
                                ],
                                "as": "user"
                            }
                        },
                        { $unset: ["user.followers", "user.followings"] }
                    ],
                    as: 'newsletters'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: { newsletter: '$newsletter' },
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
                    subscribed: { $cond: { if: { $gt: [{ $size: "$subscriptions" }, 0] }, then: true, else: false } },
                }
            },
            { $unset: ["subscriptions"] }
        ]);
        return (0, response_1.successResponse)(200, 'newsletters', newsletters);
    }
    async getArticleDetails(userId, newspaperId) {
        const newsletters = await this.articleModel.aggregate([
            { $match: { _id: new mongoose_2.default.Types.ObjectId(newspaperId) } },
            {
                $lookup: {
                    from: "newsletters",
                    let: { newsletter: '$newsletter' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$newsletter'] },
                                    ]
                                }
                            },
                        },
                        {
                            "$lookup": {
                                "from": "users",
                                "let": { "userId": "$user" },
                                "pipeline": [
                                    { "$match": { "$expr": { "$eq": ["$_id", "$$userId"] } } },
                                    { "$project": { "firstName": 1, "lastName": 1, "email": 1, _id: 1, avatar: 1,
                                            followers: 1, followings: 1 } },
                                    {
                                        $addFields: {
                                            followers_count: { $size: "$followers" },
                                            followings_count: { $size: "$followings" }
                                        }
                                    }
                                ],
                                "as": "user"
                            }
                        },
                        { $unset: ["user.followers", "user.followings"] }
                    ],
                    as: 'newsletters'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: { newsletter: '$newsletter' },
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
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: { newsletter: '$newsletter' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$newsletter', '$$newsletter'] },
                                        { $eq: ['$receiver', userId] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'all_subscriptions'
                },
            },
            {
                $lookup: {
                    from: 'newsletter-comments',
                    localField: '_id',
                    foreignField: 'article',
                    as: 'comments',
                },
            },
            {
                $lookup: {
                    from: "newsletter-likes",
                    let: { article: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$article', '$$article'] },
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
                $addFields: {
                    own_like: { $cond: { if: { $gt: [{ $size: "$like_data" }, 0] }, then: true, else: false } },
                    subscribed: { $cond: { if: { $gt: [{ $size: "$subscriptions" }, 0] }, then: true, else: false } },
                    subscription_count: { $size: "$all_subscriptions" }
                }
            },
            { $unset: ["like_data", "subscriptions", "all_subscriptions"] }
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
    async postComment(body, user, articleId) {
        const article = await this.articleModel.findById(articleId);
        if (!article)
            return (0, response_1.errorResponse)(404, 'article not found');
        article.comments_count = article.comments_count + 1;
        await article.save();
        const postComment = new this.newsletterCommentsModel(Object.assign(Object.assign({}, body), { user, article: articleId }));
        const savePostComment = await postComment.save();
        return (0, response_1.successResponse)(200, 'comment created', savePostComment);
    }
    async replyPostComment(body, user, articleId, commentId) {
        const article = await this.articleModel.findById(articleId);
        if (!article)
            return (0, response_1.errorResponse)(404, 'article not found');
        const newsletterComment = await this.newsletterCommentsModel.findById(commentId);
        if (!newsletterComment)
            return (0, response_1.errorResponse)(404, 'article comment not found');
        newsletterComment.replies.push(Object.assign(Object.assign({}, body), { user }));
        const savePostComment = await newsletterComment.save();
        return (0, response_1.successResponse)(200, 'reply saved', savePostComment);
    }
    async postNewsletterLike(user, articleId) {
        const article = await this.articleModel.findById(articleId);
        if (!article)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        const newsletterLike = await this.newslettersLikeModel.findOne({ user, article: articleId });
        if (newsletterLike)
            return (0, response_1.errorResponse)(400, 'already liked this post');
        article.likes_count = article.likes_count + 1;
        await article.save();
        const createNewsletterLike = new this.newslettersLikeModel({ user, article: articleId });
        const saveNewspaperLike = await createNewsletterLike.save();
        return (0, response_1.successResponse)(200, 'newsletter like created', saveNewspaperLike);
    }
    async createNewsletterDislike(user, articleId) {
        const article = await this.articleModel.findById(articleId);
        if (!article)
            return (0, response_1.errorResponse)(404, 'article not found');
        const newsletterLike = await this.newslettersLikeModel.findOneAndRemove({ user, article: articleId });
        if (!newsletterLike)
            return (0, response_1.errorResponse)(404, 'article like not found');
        article.likes_count = article.likes_count - 1;
        await article.save();
        return (0, response_1.successResponse)(200, 'newsletter like removed', newsletterLike);
    }
    async createNewsLetterSubscriptionRequests(senderId, newsletterId, body) {
        const newsletter = await this.newsletterModel.findById(newsletterId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
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
    async createNewsLetterSubscription(senderId, newsletterId, body) {
        const newsletter = await this.newsletterModel.findById(newsletterId);
        if (!newsletter)
            return (0, response_1.errorResponse)(404, 'newsletter not found');
        const newsletterRequest = await this.newsletterSubscriptionRequestsModel
            .findOneAndUpdate({
            sender: new mongoose_2.default.Types.ObjectId(senderId),
            newsletter: new mongoose_2.default.Types.ObjectId(newsletterId),
            receiver: new mongoose_2.default.Types.ObjectId(body.user),
        }, {
            sender: new mongoose_2.default.Types.ObjectId(senderId),
            newsletter: new mongoose_2.default.Types.ObjectId(newsletterId),
            receiver: new mongoose_2.default.Types.ObjectId(body.user),
            request_state: newsletter_enum_1.NewsLetterSubscriptionRequestsType.ACCEPTED,
            is_invite: false
        }, { upsert: true, new: true });
        return (0, response_1.successResponse)(200, 'new request created', newsletterRequest);
    }
    async updateNewsLetterSubscriptionRequest(newsletterId, body) {
        const newsletterRequest = await this.newsletterSubscriptionRequestsModel.findById(newsletterId);
        if (!newsletterRequest)
            return (0, response_1.errorResponse)(404, 'request not found');
        newsletterRequest.request_state = body.request_state;
        await newsletterRequest.save();
        return (0, response_1.successResponse)(200, 'request status updated', newsletterRequest);
    }
    async getAllSubscriptionRequests(userId) {
        const sent = await this.newsletterSubscriptionRequestsModel.find({ sender: userId, request_state: "initiated" })
            .populate("receiver", "firstName lastName email avatar")
            .populate("sender", "firstName lastName email avatar")
            .populate("newsletter", "_id title image details time")
            .sort({ "date_created": -1 });
        const received = await this.newsletterSubscriptionRequestsModel.find({ receiver: userId, request_state: "initiated" })
            .populate("sender", "firstName lastName email avatar")
            .populate("newsletter", "_id title image details time")
            .populate("sender", "firstName lastName email avatar")
            .sort({ "date_created": -1 });
        return (0, response_1.successResponse)(200, 'request status updated', { sent, received });
    }
    async getAllSubscribedNewsletters(userId) {
        const newsletters = await this.newsletterSubscriptionRequestsModel.find({ sender: userId, request_state: "accepted" })
            .populate("receiver", "firstName lastName email avatar")
            .populate("sender", "firstName lastName email avatar")
            .populate("newsletter", "_id title image details time")
            .sort({ "date_created": -1 });
        return (0, response_1.successResponse)(200, 'request status updated', newsletters);
    }
    async saveArticle(userId, payload) {
        const user = await this.usersModel.findById(userId);
        const article = await this.articleModel.findById(payload.article);
        if (!article)
            return (0, response_1.errorResponse)(404, 'article not found');
        const findIndex = (user.savedArticles || []).indexOf(payload.article);
        let savedArticles = user.savedArticles || [];
        if (findIndex === -1) {
            savedArticles.push(payload.article);
        }
        user.savedArticles = savedArticles;
        const saveUser = await user.save();
        return (0, response_1.successResponse)(200, 'article save', saveUser);
    }
};
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('newsletters')),
    __param(1, (0, mongoose_1.InjectModel)('articles')),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)("newsletter-likes")),
    __param(4, (0, mongoose_1.InjectModel)("newsletter-comments")),
    __param(5, (0, mongoose_1.InjectModel)("newsletter-subscriptions-requests")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map