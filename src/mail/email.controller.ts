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
import {
    CreatePostComment,
    CreatePostDto,
    CreatePostFilterDto,
    SavePostDto,
    UpdatePostDto
} from "src/posts/dtos/posts.dto";
import {PostService} from "src/posts/post.service";
import FileUploadToS3 from "src/utils/FileUploadToS3";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {file} from "@babel/types";
import {SaveArticleDto} from "src/newsletter/dtos/newsletter.dto";
import {successResponse} from "src/utils/response";
import {GoalsService} from "src/goals/goals.service";
import mongoose from "mongoose";
import {EmailDto} from "src/mail/dtos/posts.dto";
import {EmailService} from "src/mail/email.service";

@Controller('email')
export class EmailController {
    constructor(
        private emailService: EmailService,
    ) {
    }


    @Post('/')
    async create(@Body() body: EmailDto) {
        const response = await this.emailService.create(body);
        return response;
    }

}
