import {
    Body,
    Controller,
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
    CreateNewsletterComment,
    CreateNewsLetterDto,
    CreateNewsletterSubscriptionDto, UpdateNewsletterSubscriptionStatusRequest
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
        const response = await this.newsletterService.create(body,file.location,req.user._id);
        return response;
    }


    @Get('/:id/details')
    async getNewsletterDetails(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.newsletterService.getNewsLetterDetails(req.user._id,id);
        return response;
    }


    @Get('/all')
    async getAllNewsletters(@Request() req) {
        const response = await this.newsletterService.getAllNewsPapers(req.user._id);
        return response;
    }


    @Get('/user')
    async getAllUserNewsletters(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.newsletterService.getUserNewsLetters(req.user._id);
        return response;
    }


    @Post('/:newsletterId/comment')
    async postComment(@Body() body: CreateNewsletterComment,@Param('newsletterId') newsletterId: string,@Request() req) {
        const response = await this.newsletterService.postComment(body,req.user._id,newsletterId);
        return response;
    }

    @Post('/:newsletterId/comment/:commentId/reply')
    async postCommentReply(@Body() body: CreateNewsletterComment,@Param('newsletterId') newsletterId: string
                           ,@Param('commentId') commentId: string,@Request() req) {
        const response = await this.newsletterService.replyPostComment(body,req.user._id,newsletterId,commentId);
        return response;
    }


    @Post('/:newsletterId/like')
    async createNewsletterLike(@Param('newsletterId') newsletterId: string,@Request() req) {
        const response = await this.newsletterService.postNewsletterLike(req.user._id,newsletterId);
        return response;
    }


    @Post('/:newsletterId/dislike')
    async createNewsletterDislike(@Param('newsletterId') newsletterId: string,@Request() req) {
        const response = await this.newsletterService.createNewsletterDislike(req.user._id,newsletterId);
        return response;
    }


    @Post('/:newsletterId/subscription')
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
}
