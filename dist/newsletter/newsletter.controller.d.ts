import { NewsletterService } from "src/newsletter/newsletter.service";
import { CreateNewsletterComment, CreateNewsLetterDto, CreateNewsletterSubscriptionDto, UpdateNewsletterSubscriptionStatusRequest } from "src/newsletter/dtos/newsletter.dto";
export declare class NewsletterController {
    private newsletterService;
    constructor(newsletterService: NewsletterService);
    create(file: any, body: CreateNewsLetterDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getNewsletterDetails(id: string, type: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllNewsletters(req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllUserNewsletters(id: string, type: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postComment(body: CreateNewsletterComment, newsletterId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postCommentReply(body: CreateNewsletterComment, newsletterId: string, commentId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createNewsletterLike(newsletterId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createNewsletterDislike(newsletterId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createNewsletterSubscription(body: CreateNewsletterSubscriptionDto, newsletterId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    updateNewsletterSubscriptionStatus(body: UpdateNewsletterSubscriptionStatusRequest, newsletterSubscriptionId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllSubscriptions(req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
