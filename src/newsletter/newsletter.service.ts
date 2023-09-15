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
    CreateNewsletterComment,
    CreateNewsLetterDto,
    CreateNewsletterSubscriptionDto,
    UpdateNewsletterSubscriptionStatusRequest
} from "src/newsletter/dtos/newsletter.dto";
import {NewsletterSubscriptionsDocument} from "src/newsletter/models/subscriptions.model";
import {NewsLetterSubscriptionRequestsType} from "src/enums/newsletter.enum";

@Injectable()
export class NewsletterService {
    constructor(
        @InjectModel('newsletters')
        private readonly newsletterModel: Model<NewsLetterDocument>,
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

    async create(body: CreateNewsLetterDto, fileName: string, user: string) {
        const newsletter = new this.newsletterModel({...body, image: fileName, user});
        const saveNewsletter = await newsletter.save();
        return successResponse(200, 'newsletter created', saveNewsletter);
    }


    async getAllNewsPapers(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            {
                $lookup: {
                    from: "newsletter-likes",
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
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
                $addFields: {
                    own_like: {$cond: {if: {$gt: [{$size: "$like_data"}, 0]}, then: true, else: false}},
                    subscribed: {$cond: {if: {$gt: [{$size: "$subscriptions"}, 0]}, then: true, else: false}}

                }
            },
            {$unset: ["like_data", "subscriptions"]}
        ])


        if (!newsletters)
            return errorResponse(404, 'newsletter not found');

        await this.newsletterModel.populate(newsletters, {path: "user", select: "firstName lastName email avatar"});


        return successResponse(200, 'newsletters', newsletters);
    }


    async getUserNewsLetters(userId) {
        const newsletters = await this.newsletterModel.aggregate([
            {$match: {user: new mongoose.Types.ObjectId(userId)}},
        ])


        return successResponse(200, 'newsletter', newsletters);
    }


    async getNewsLetterDetails(userId, newspaperId: string) {
        const newsletters = await this.newsletterModel.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(newspaperId)}},
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
                    let: {newsletter: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
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
                $lookup: {
                    from: "newsletter-subscriptions-requests",
                    let: {
                        newsletter: '$_id',
                        request_state: NewsLetterSubscriptionRequestsType.ACCEPTED,
                        receiver: userId
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$newsletter', '$$newsletter']},
                                        {$eq: ['$request_state', '$$request_state']},
                                        {$eq: ['$receiver', '$$receiver']},

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
                    own_like: {$cond: {if: {$gt: [{$size: "$like_data"}, 0]}, then: true, else: false}},
                    subscribed: {$cond: {if: {$gt: [{$size: "$subscriptions"}, 0]}, then: true, else: false}}

                }
            },
            {$unset: ["like_data", "subscriptions"]}
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


    async postComment(body: CreateNewsletterComment, user: string, newsletterId: string) {

        const newsletter = await this.newsletterModel.findById(newsletterId)

        if (!newsletter)
            return errorResponse(404, 'newsletter not found');

        newsletter.comments_count = newsletter.comments_count + 1;
        await newsletter.save();

        const postComment = new this.newsletterCommentsModel({...body, user, newsletter: newsletterId});
        const savePostComment = await postComment.save();
        return successResponse(200, 'comment created', savePostComment);
    }


    async replyPostComment(body: CreateNewsletterComment, user: string, newsletterId: string, commentId: string) {

        const newsletter = await this.newsletterModel.findById(newsletterId)

        if (!newsletter)
            return errorResponse(404, 'newsletter not found');


        const newsletterComment = await this.newsletterCommentsModel.findById(commentId)

        if (!newsletterComment)
            return errorResponse(404, 'newsletter comment not found');

        newsletterComment.replies.push({...body, user})

        const savePostComment = await newsletterComment.save();
        return successResponse(200, 'reply saved', savePostComment);
    }


    async postNewsletterLike(user: string, newsletterId: string) {

        const newsletter = await this.newsletterModel.findById(newsletterId)

        if (!newsletter)
            return errorResponse(404, 'newsletter not found');


        const newsletterLike = await this.newslettersLikeModel.findOne({user, newsletter: newsletterId});

        if (newsletterLike)
            return errorResponse(400, 'already liked this post');


        newsletter.likes_count = newsletter.likes_count + 1;
        await newsletter.save();


        const createNewsletterLike = new this.newslettersLikeModel({user, newsletter: newsletterId});
        const saveNewspaperLike = await createNewsletterLike.save();
        return successResponse(200, 'newsletter like created', saveNewspaperLike);
    }


    async createNewsletterDislike(user: string, newsletterId: string) {

        const newsletter = await this.newsletterModel.findById(newsletterId)

        if (!newsletter)
            return errorResponse(404, 'newsletter not found');


        const newsletterLike = await this.newslettersLikeModel.findOneAndRemove({user, newsletter: newsletterId});

        if (!newsletterLike)
            return errorResponse(404, 'newsletter like not found');


        newsletter.likes_count = newsletter.likes_count - 1;
        await newsletter.save();


        return successResponse(200, 'newsletter like removed', newsletterLike);
    }


    async createNewsLetterSubscriptionRequests(senderId: string, newsletterId: string, body: CreateNewsletterSubscriptionDto) {

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


    async updateNewsLetterSubscriptionRequest(newsletterId: string, body: UpdateNewsletterSubscriptionStatusRequest) {

        const newsletterRequest = await this.newsletterSubscriptionRequestsModel.findById(newsletterId);
        if (!newsletterRequest)
            return errorResponse(404, 'request not found');

        newsletterRequest.request_state = body.request_state;

        return successResponse(200, 'request status updated', newsletterRequest);
    }

    async getAllSubscriptionRequests(userId: string) {

        const sent = await this.newsletterSubscriptionRequestsModel.find({sender: userId})
            .populate("receiver","firstName lastName email avatar")
            .sort({"date_created":-1});
        const received = await this.newsletterSubscriptionRequestsModel.find({receiver: userId})
            .populate("sender","firstName lastName email avatar")
            .sort({"date_created":-1});


        return successResponse(200, 'request status updated', {sent, received});
    }
}



