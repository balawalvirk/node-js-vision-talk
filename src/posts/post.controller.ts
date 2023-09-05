import {
    Body,
    Controller,
    Get, Param,
    ParseFilePipe,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostComment, CreatePostDto} from "src/posts/dtos/posts.dto";
import {PostService} from "src/posts/post.service";
import FileUploadToS3 from "src/utils/FileUploadToS3";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {file} from "@babel/types";

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
    constructor(private postService: PostService) {
    }


    @UseInterceptors(FileInterceptor('file',{  storage: FileUploadToS3.uploadFile() }))
    @Post('/')
    async create(@UploadedFile(new ParseFilePipe(
        {fileIsRequired: true,
        })) file: any,@Body() body: CreatePostDto,@Request() req) {
        const response = await this.postService.create(body,file.location,req.user._id);
        return response;
    }


    @Get('/:id/type/:type/details')
    async getPostDetails(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.postService.getPostDetails(req.user._id,id,type);
        return response;
    }


    @Get('/type/:type/all')
    async getAllPosts(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.postService.getAllPosts(req.user._id,type);
        return response;
    }


    @Get('/user')
    async getAllUserPosts(@Param('id') id: string,@Param('type') type: string,@Request() req) {
        const response = await this.postService.getUserPosts(req.user._id);
        return response;
    }


    @Post('/:postId/comment')
    async postComment(@Body() body: CreatePostComment,@Param('postId') postId: string,@Request() req) {
        const response = await this.postService.postComment(body,req.user._id,postId);
        return response;
    }

    @Post('/:postId/comment/:commentId/reply')
    async postCommentReply(@Body() body: CreatePostComment,@Param('postId') postId: string,@Param('commentId') commentId: string,@Request() req) {
        const response = await this.postService.replyPostComment(body,req.user._id,postId,commentId);
        return response;
    }


    @Post('/:postId/like')
    async createPostLike(@Param('postId') postId: string,@Request() req) {
        const response = await this.postService.postLike(req.user._id,postId);
        return response;
    }


    @Post('/:postId/dislike')
    async createPostDislike(@Param('postId') postId: string,@Request() req) {
        const response = await this.postService.postDisLike(req.user._id,postId);
        return response;
    }

}
