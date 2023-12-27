import { Model } from 'mongoose';
import { UserDocument } from "src/users/user.schema";
import { NewsLetterDocument } from "src/newsletter/models/newsletter.model";
import { NewsLetterLikeDocument } from "src/newsletter/models/likes.model";
import { NewsLetterCommentDocument } from "src/newsletter/models/comments.model";
import { CreateArticleDto, CreateNewsletterComment, CreateNewsLetterDto, CreateNewsletterSubscriptionDto, SaveArticleDto, UpdateNewsLetterDto, UpdateNewsletterSubscriptionStatusRequest } from "src/newsletter/dtos/newsletter.dto";
import { NewsletterSubscriptionsDocument } from "src/newsletter/models/subscriptions.model";
import { ArticleDocument } from "src/newsletter/models/article.model";
export declare class NewsletterService {
    private readonly newsletterModel;
    private readonly articleModel;
    private readonly usersModel;
    private readonly newslettersLikeModel;
    private readonly newsletterCommentsModel;
    private readonly newsletterSubscriptionRequestsModel;
    constructor(newsletterModel: Model<NewsLetterDocument>, articleModel: Model<ArticleDocument>, usersModel: Model<UserDocument>, newslettersLikeModel: Model<NewsLetterLikeDocument>, newsletterCommentsModel: Model<NewsLetterCommentDocument>, newsletterSubscriptionRequestsModel: Model<NewsletterSubscriptionsDocument>);
    createNewsLetter(body: CreateNewsLetterDto, fileName: string, user: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    updateNewsLetter(body: UpdateNewsLetterDto, fileName: string, newsLetterId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deleteById(newsLetterId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createArticle(body: CreateArticleDto, fileName: string, user: string, newspaperId: any): Promise<{
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
    getNewsLetterById(userId: any, newsLetterId: any): Promise<{
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
    getAllArticles(userId: String): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getArticleDetails(userId: any, newspaperId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postComment(body: CreateNewsletterComment, user: string, articleId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    replyPostComment(body: CreateNewsletterComment, user: string, articleId: string, commentId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postNewsletterLike(user: string, articleId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createNewsletterDislike(user: string, articleId: string): Promise<{
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
    createNewsLetterSubscription(senderId: string, newsletterId: string, body: CreateNewsletterSubscriptionDto): Promise<{
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
    getAllSubscribedNewsletters(userId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    saveArticle(userId: string, payload: SaveArticleDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    removeSaveArticle(userId: string, articleId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
