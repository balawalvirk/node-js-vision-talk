import { Model } from 'mongoose';
import { UserDocument } from "src/users/user.schema";
import { NewsLetterDocument } from "src/newsletter/models/newsletter.model";
import { NewsLetterLikeDocument } from "src/newsletter/models/likes.model";
import { NewsLetterCommentDocument } from "src/newsletter/models/comments.model";
import { CreateNewsletterComment, CreateNewsLetterDto, CreateNewsletterSubscriptionDto, UpdateNewsletterSubscriptionStatusRequest } from "src/newsletter/dtos/newsletter.dto";
import { NewsletterSubscriptionsDocument } from "src/newsletter/models/subscriptions.model";
export declare class NewsletterService {
    private readonly newsletterModel;
    private readonly usersModel;
    private readonly newslettersLikeModel;
    private readonly newsletterCommentsModel;
    private readonly newsletterSubscriptionRequestsModel;
    constructor(newsletterModel: Model<NewsLetterDocument>, usersModel: Model<UserDocument>, newslettersLikeModel: Model<NewsLetterLikeDocument>, newsletterCommentsModel: Model<NewsLetterCommentDocument>, newsletterSubscriptionRequestsModel: Model<NewsletterSubscriptionsDocument>);
    create(body: CreateNewsLetterDto, fileName: string, user: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllNewsPapers(userId: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getUserNewsLetters(userId: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getNewsLetterDetails(userId: any, newspaperId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postComment(body: CreateNewsletterComment, user: string, newsletterId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    replyPostComment(body: CreateNewsletterComment, user: string, newsletterId: string, commentId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postNewsletterLike(user: string, newsletterId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createNewsletterDislike(user: string, newsletterId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createNewsLetterSubscriptionRequests(senderId: string, newsletterId: string, body: CreateNewsletterSubscriptionDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    updateNewsLetterSubscriptionRequest(newsletterId: string, body: UpdateNewsletterSubscriptionStatusRequest): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllSubscriptionRequests(userId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
