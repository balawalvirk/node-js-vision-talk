import {
    Body,
    Controller, Delete,
    Get, Param,
    ParseFilePipe,
    Post, Put,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import FileUploadToS3 from "src/utils/FileUploadToS3";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {file} from "@babel/types";
import {NewsletterService} from "src/newsletter/newsletter.service";
import {
    CreateArticleDto,
    CreateNewsletterComment,
    CreateNewsLetterDto,
    CreateNewsletterSubscriptionDto, SaveArticleDto, UpdateNewsletterSubscriptionStatusRequest
} from "src/newsletter/dtos/newsletter.dto";

@UseGuards(JwtAuthGuard)
@Controller('newsletter')
export class NewsletterController {
    constructor(private newsletterService: NewsletterService) {
    }


    @UseInterceptors(FileInterceptor('file',{  storage: FileUploadToS3.uploadFile() }))
    @Post('/')
    async create(@UploadedFile(new ParseFilePipe(
        {fileIsRequired: true,
        })) file: any,@Body() body: CreateNewsLetterDto,@Request() req) {
        const response = await this.newsletterService.createNewsLetter(body,file.location,req.user._id);
        return response;
    }


    @UseInterceptors(FileInterceptor('file',{  storage: FileUploadToS3.uploadFile() }))
    @Post('/:id/article')
    async createArticle(@UploadedFile(new ParseFilePipe(
        {fileIsRequired: true,
        })) file: any,@Body() body: CreateArticleDto,@Request() req) {
        const response = await this.newsletterService.createArticle(body,file.location,req.user._id,req.params.id);
        return response;
    }


    @Get('/:id/details')
    async getNewsLetterById(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.newsletterService.getNewsLetterById(req.user._id,id);
        return response;
    }



    @Get('/article/:id/details')
    async getArticleDetails(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.newsletterService.getArticleDetails(req.user._id,id);
        return response;
    }


    @Get('/all')
    async getAllNewsletters(@Request() req) {
        const response = await this.newsletterService.getAllNewsPapers(req.user._id);
        return response;
    }


    @Get('/articles/all')
    async getAllArticles(@Request() req) {
        const response = await this.newsletterService.getAllArticles(req.user._id);
        return response;
    }

    @Get('/user')
    async getAllUserNewsletters(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.newsletterService.getUserNewsLetters(req.user._id);
        return response;
    }


    @Post('/article/:articleId/comment')
    async postComment(@Body() body: CreateNewsletterComment,@Param('articleId') articleId: string,@Request() req) {
        const response = await this.newsletterService.postComment(body,req.user._id,articleId);
        return response;
    }

    @Post('/article/:articleId/comment/:commentId/reply')
    async postCommentReply(@Body() body: CreateNewsletterComment,@Param('articleId') articleId: string
                           ,@Param('commentId') commentId: string,@Request() req) {
        const response = await this.newsletterService.replyPostComment(body,req.user._id,articleId,commentId);
        return response;
    }


    @Post('/article/:articleId/like')
    async createNewsletterLike(@Param('articleId') articleId: string,@Request() req) {
        const response = await this.newsletterService.postNewsletterLike(req.user._id,articleId);
        return response;
    }


    @Post('/article/:articleId/dislike')
    async createNewsletterDislike(@Param('articleId') articleId: string,@Request() req) {
        const response = await this.newsletterService.createNewsletterDislike(req.user._id,articleId);
        return response;
    }


    @Post('/:newsletterId/subscribe')
    async subscribeNewsletter(@Body() body: CreateNewsletterSubscriptionDto,
                                       @Param('newsletterId') newsletterId: string,@Request() req) {
        const response = await this.newsletterService.createNewsLetterSubscription(req.user._id,newsletterId,body);
        return response;
    }

    @Post('/:newsletterId/subscription/invite')
    async createNewsletterSubscription(@Body() body: CreateNewsletterSubscriptionDto,
                                       @Param('newsletterId') newsletterId: string,@Request() req) {
        const response = await this.newsletterService.createNewsLetterSubscriptionRequests(req.user._id,newsletterId,body);
        return response;
    }


    @Put('/subscription/:newsletterSubscriptionId')
    async updateNewsletterSubscriptionStatus(@Body() body: UpdateNewsletterSubscriptionStatusRequest,
            @Param('newsletterSubscriptionId') newsletterSubscriptionId: string,@Request() req) {
            const response = await this.newsletterService.updateNewsLetterSubscriptionRequest(newsletterSubscriptionId,body);
            return response;
    }


    @Get('/subscription')
    async getAllSubscriptions(@Request() req) {
        const response = await this.newsletterService.getAllSubscriptionRequests(req.user._id);
        return response;
    }


    @Get('/subscribed')
    async getAllSubscribedNewsletters(@Request() req) {
        const response = await this.newsletterService.getAllSubscribedNewsletters(req.user._id);
        return response;
    }



    @Post('/article/save')
    async saveArticle(@Body() body: SaveArticleDto, @Request() req) {
        const response = await this.newsletterService.saveArticle(req.user._id,body);
        return response;
    }


    @Delete('/article/:id/save')
    async removeSavedArticle( @Param('id') id: string,@Request() req) {
        const response = await this.newsletterService.removeSaveArticle(req.user._id,id);
        return response;
    }
}
