import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {PostDocument} from "src/posts/models/posts.model";
import {errorResponse, successResponse} from "src/utils/response";
import {User, UserDocument} from "src/users/user.schema";
import {PostLikeDocument} from "src/posts/models/likes.model";
import {PostCommentDocument} from "src/posts/models/comments.model";
import {OrderByEnum} from "src/enums/posts.enum";
import {NewsLetterDocument} from "src/newsletter/models/newsletter.model";
import {NewsLetterLikeDocument} from "src/newsletter/models/likes.model";
import {NewsLetterCommentDocument} from "src/newsletter/models/comments.model";
import {
    CreateArticleDto,
    CreateNewsletterComment,
    CreateNewsLetterDto,
    CreateNewsletterSubscriptionDto,
    UpdateNewsletterSubscriptionStatusRequest
} from "src/newsletter/dtos/newsletter.dto";
import {NewsletterSubscriptionsDocument} from "src/newsletter/models/subscriptions.model";
import {NewsLetterSubscriptionRequestsType} from "src/enums/newsletter.enum";
import {ArticleDocument} from "src/newsletter/models/article.model";

@Injectable()
export class NewsletterService {
    constructor(
        @InjectModel('newsletters')
        private readonly newsletterModel: Model<NewsLetterDocument>,
        @InjectModel('articles')
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(User.name)
        private readonly usersModel: Model<UserDocument>,
        @InjectModel("newsletter-likes")
        private readonly newslettersLikeModel: Model<NewsLetterLikeDocument>,
        @InjectModel("newsletter-comments")
        private readonly newsletterCommentsModel: Model<NewsLetterCommentDocument>,
        @InjectModel("newsletter-subscriptions-requests")
        private readonly newsletterSubscriptionRequestsModel: Model<NewsletterSubscriptionsDocument>,
    ) {
    }


    async createNewsLetter(body: CreateNewsLetterDto, fileName: string, user: string) {
        const newsletter = new this.newsletterModel({...body, image: fileName, user});
        const saveNewsletter = await newsletter.save();
        return successResponse(200, 'newsletter created', saveNewsletter);
    }

    async createArticle(body: CreateArticleDto, fileName: string, user: string, newspaperId) {

        const newsletter = await this.newsletterModel.findById(newspaperId);

        if (!newsletter)
            return errorResponse(404, 'newsletter not found');


        const newsletterArticle = new this.articleModel({...body, image: fileName, user, newsletter: newspaperId});
        const saveNewsletterArticle = await newsletterArticle.save();
        return successResponse(200, 'article created', saveNewsletterArticle);
    }


    async getAllNewsPapers(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            {
                $lookup: {
                    from: "articles",
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']}
                                    ]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: "newsletter-likes",
                                let: {article: '$_id'},
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {$eq: ['$article', '$$article']},
                                                    {$eq: ['$user', userId]}
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
                                own_like: {$cond: {if: {$gt: [{$size: "$like_data"}, 0]}, then: true, else: false}}

                            }
                        },
                        {$unset: ["like_data"]}

                    ],
                    as: 'articles'
                },
            },
            {"$unwind": "$articles"},
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$receiver', userId]},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    subscribed: {$cond: {if: {$gt: [{$size: "$subscriptions"}, 0]}, then: true, else: false}},
                    subscriptions_count: {$size: "$all_subscriptions"}
                }
            },
            {$unset: ["subscriptions", "all_subscriptions"]}
        ])


        if (!newsletters)
            return errorResponse(404, 'newsletter not found');

        await this.newsletterModel.populate(newsletters, {path: "user", select: "firstName lastName email avatar"});


        return successResponse(200, 'newsletters', newsletters);
    }


    async getNewsLetterById(userId, newsLetterId) {
        const newsletters = await this.newsletterModel.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(newsLetterId)}},
            {
                $lookup: {
                    from: "articles",
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']}
                                    ]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: "newsletter-likes",
                                let: {article: '$_id'},
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {$eq: ['$article', '$$article']},
                                                    {$eq: ['$user', userId]}
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
                                own_like: {$cond: {if: {$gt: [{$size: "$like_data"}, 0]}, then: true, else: false}}

                            }
                        },
                        {$unset: ["like_data"]}

                    ],
                    as: 'articles'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$receiver', userId]},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    subscribed: {$cond: {if: {$gt: [{$size: "$subscriptions"}, 0]}, then: true, else: false}},
                    subscriptions_count: {$size: "$all_subscriptions"}
                }
            },
            {$unset: ["subscriptions", "all_subscriptions"]}
        ])


        if (!newsletters)
            return errorResponse(404, 'newsletter not found');

        await this.newsletterModel.populate(newsletters,
            {path: "user", select: "firstName lastName email avatar"});


        return successResponse(200, 'newsletters', newsletters);
    }


    async getUserNewsLetters(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            {$match: {user: new mongoose.Types.ObjectId(userId)}},
            {
                $lookup: {
                    from: "articles",
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']}
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
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    subscription_count: {$size: "$subscriptions"}
                }
            },
            {$unset: ["subscriptions"]}
        ])


        return successResponse(200, 'newsletter', newsletters);
    }


    async getAllArticles(userId: String) {
        const newsletters = await this.articleModel.aggregate([
            {
                $lookup: {
                    from: "newsletters",
                    let: {newsletter: '$newsletter'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$_id', '$$newsletter']},
                                    ]
                                }
                            },

                        },
                        {
                            "$lookup": {
                                "from": "users",
                                "let": {"userId": "$user"},
                                "pipeline": [
                                    {"$match": {"$expr": {"$eq": ["$_id", "$$userId"]}}},
                                    { "$project": { "firstName": 1, "lastName": 1,"email":1,_id:1,avatar:1,
                                        followers:1,followings:1}},
                                    {
                                        $addFields: {
                                            followers_count: {$size: "$followers"},
                                            followings_count: {$size: "$followings"}

                                        }
                                    }
                                ],
                                "as": "user"
                            }
                        },
                        {$unset: ["user.followers","user.followings"]}

                    ],
                    as: 'newsletters'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: {newsletter: '$newsletter'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$receiver', userId]},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    subscribed: {$cond: {if: {$gt: [{$size: "$subscriptions"}, 0]}, then: true, else: false}},

                }
            },
            {$unset: ["subscriptions"]}

        ])


        return successResponse(200, 'newsletters', newsletters);
    }


    async getArticleDetails(userId, newspaperId: string) {
        const newsletters = await this.articleModel.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(newspaperId)}},
            {
                $lookup: {
                    from: "newsletters",
                    let: {newsletter: '$newsletter'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$_id', '$$newsletter']},
                                    ]
                                }
                            },

                        },
                        {
                            "$lookup": {
                                "from": "users",
                                "let": {"userId": "$user"},
                                "pipeline": [
                                    {"$match": {"$expr": {"$eq": ["$_id", "$$userId"]}}},
                                    { "$project": { "firstName": 1, "lastName": 1,"email":1,_id:1,avatar:1,
                                            followers:1,followings:1}},
                                    {
                                        $addFields: {
                                            followers_count: {$size: "$followers"},
                                            followings_count: {$size: "$followings"}

                                        }
                                    }
                                ],
                                "as": "user"
                            }
                        },
                        {$unset: ["user.followers","user.followings"]}

                    ],
                    as: 'newsletters'
                },
            },
            {
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: {newsletter: '$newsletter'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$receiver', userId]},
                                        {$eq: ['$request_state', NewsLetterSubscriptionRequestsType.ACCEPTED]},
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
                    let: {newsletter: '$newsletter'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$receiver', userId]},
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
                    let: {article: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$article', '$$article']},
                                        {$eq: ['$user', userId]}
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
                    own_like: {$cond: {if: {$gt: [{$size: "$like_data"}, 0]}, then: true, else: false}},
                    subscribed: {$cond: {if: {$gt: [{$size: "$subscriptions"}, 0]}, then: true, else: false}},
                    subscription_count: {$size: "$all_subscriptions"}

                }
            },
            {$unset: ["like_data","subscriptions","all_subscriptions"]}
        ])


        if (!newsletters)
            return errorResponse(404, 'newsletter not found');

        await this.newsletterModel.populate(newsletters, {path: "user", select: "firstName lastName email avatar"});
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


        return successResponse(200, 'newsletters', newsletters);
    }


    async postComment(body: CreateNewsletterComment, user: string, articleId: string) {

        const article = await this.articleModel.findById(articleId)

        if (!article)
            return errorResponse(404, 'article not found');

        article.comments_count = article.comments_count + 1;
        await article.save();

        const postComment = new this.newsletterCommentsModel({...body, user, article: articleId});
        const savePostComment = await postComment.save();
        return successResponse(200, 'comment created', savePostComment);
    }


    async replyPostComment(body: CreateNewsletterComment, user: string, articleId: string, commentId: string) {

        const article = await this.articleModel.findById(articleId)

        if (!article)
            return errorResponse(404, 'article not found');


        const newsletterComment = await this.newsletterCommentsModel.findById(commentId)

        if (!newsletterComment)
            return errorResponse(404, 'article comment not found');

        newsletterComment.replies.push({...body, user})

        const savePostComment = await newsletterComment.save();
        return successResponse(200, 'reply saved', savePostComment);
    }


    async postNewsletterLike(user: string, articleId: string) {

        const article = await this.articleModel.findById(articleId)

        if (!article)
            return errorResponse(404, 'newsletter not found');


        const newsletterLike = await this.newslettersLikeModel.findOne({user, article: articleId});

        if (newsletterLike)
            return errorResponse(400, 'already liked this post');


        article.likes_count = article.likes_count + 1;
        await article.save();


        const createNewsletterLike = new this.newslettersLikeModel({user, article: articleId});
        const saveNewspaperLike = await createNewsletterLike.save();
        return successResponse(200, 'newsletter like created', saveNewspaperLike);
    }


    async createNewsletterDislike(user: string, articleId: string) {

        const article = await this.articleModel.findById(articleId)

        if (!article)
            return errorResponse(404, 'article not found');


        const newsletterLike = await this.newslettersLikeModel.findOneAndRemove({user, article: articleId});

        if (!newsletterLike)
            return errorResponse(404, 'article like not found');


        article.likes_count = article.likes_count - 1;
        await article.save();


        return successResponse(200, 'newsletter like removed', newsletterLike);
    }


    async createNewsLetterSubscriptionRequests(senderId: string, newsletterId: string, body: CreateNewsletterSubscriptionDto) {
        const newsletter=await this.newsletterModel.findById(newsletterId);
        if(!newsletter)
            return errorResponse(404, 'newsletter not found');


        const newsletterRequest = await this.newsletterSubscriptionRequestsModel
            .findOne({
                sender: new mongoose.Types.ObjectId(senderId),
                newsletter: new mongoose.Types.ObjectId(newsletterId),
                receiver: new mongoose.Types.ObjectId(body.user)
            })

        if (newsletterRequest)
            return errorResponse(404, 'request is already sent');

        const newsletterSubscriptionRequest = await this.newsletterSubscriptionRequestsModel
            .create({sender: senderId, receiver: body.user, newsletter: newsletterId})


        return successResponse(200, 'new request created', newsletterSubscriptionRequest);
    }


    async createNewsLetterSubscription(senderId: string, newsletterId: string, body: CreateNewsletterSubscriptionDto) {
        const newsletter=await this.newsletterModel.findById(newsletterId);
        if(!newsletter)
            return errorResponse(404, 'newsletter not found');


        const newsletterRequest = await this.newsletterSubscriptionRequestsModel
            .findOneAndUpdate({
                sender: new mongoose.Types.ObjectId(senderId),
                newsletter: new mongoose.Types.ObjectId(newsletterId),
                receiver: new mongoose.Types.ObjectId(body.user),
            },{
                sender: new mongoose.Types.ObjectId(senderId),
                newsletter: new mongoose.Types.ObjectId(newsletterId),
                receiver: new mongoose.Types.ObjectId(body.user),
                request_state:NewsLetterSubscriptionRequestsType.ACCEPTED,
                is_invite:false
            },{upsert:true,new:true})



        return successResponse(200, 'new request created', newsletterRequest);
    }


    async updateNewsLetterSubscriptionRequest(newsletterId: string, body: UpdateNewsletterSubscriptionStatusRequest) {

        const newsletterRequest = await this.newsletterSubscriptionRequestsModel.findById(newsletterId);
        if (!newsletterRequest)
            return errorResponse(404, 'request not found');

        newsletterRequest.request_state = body.request_state;
        await newsletterRequest.save();
        return successResponse(200, 'request status updated', newsletterRequest);
    }

    async getAllSubscriptionRequests(userId: string) {

        const sent = await this.newsletterSubscriptionRequestsModel.find({sender: userId,request_state:"initiated"})
            .populate("receiver", "firstName lastName email avatar")
            .populate("sender", "firstName lastName email avatar")
            .populate("newsletter", "_id title image details time")
            .sort({"date_created": -1});
        const received = await this.newsletterSubscriptionRequestsModel.find({receiver: userId,request_state:"initiated"})
            .populate("sender", "firstName lastName email avatar")
            .populate("newsletter", "_id title image details time")
            .populate("sender", "firstName lastName email avatar")
            .sort({"date_created": -1});


        return successResponse(200, 'request status updated', {sent, received});
    }


    async getAllSubscribedNewsletters(userId: string) {

        const newsletters = await this.newsletterSubscriptionRequestsModel.find({sender: userId,request_state:"accepted"})
            .populate("receiver", "firstName lastName email avatar")
            .populate("sender", "firstName lastName email avatar")
            .populate("newsletter", "_id title image details time")
            .sort({"date_created": -1});


        return successResponse(200, 'request status updated', newsletters);
    }

}



