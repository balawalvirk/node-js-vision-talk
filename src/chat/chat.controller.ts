import {
    Body,
    Controller, Delete,
    Get, Param,
    ParseFilePipe,
    Post, Put,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors, ValidationPipe
} from '@nestjs/common';
import {CreatePostComment, CreatePostDto, CreatePostFilterDto} from "src/posts/dtos/posts.dto";
import {PostService} from "src/posts/post.service";
import FileUploadToS3 from "src/utils/FileUploadToS3";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {file} from "@babel/types";
import {successResponse} from "src/utils/response";
import {ChatService} from "src/chat/chat.service";
import {
    AddRemoveUserGroupDto,
    CreateChatDto,
    CreateGroupDto,
    CreateGroupMessageDto,
    CreateSessionDto
} from "src/chat/dto/chat.dto";

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {
    }


    @UseInterceptors(FileInterceptor('file',{  storage: FileUploadToS3.uploadFile() }))
    @Post('/file')
    async create(@UploadedFile(new ParseFilePipe(
        {fileIsRequired: true,
        })) file: any,@Body() body: CreatePostDto,@Request() req) {
        return successResponse(200, 'file created', {file:file.location});
    }



    @Post('/contact-message')
    async createChat(@Body() body: CreateChatDto,@Request() req) {
        const response = await this.chatService.create(req.user._id,body,);
        return response;
    }


    @Post('/session')
    async createChatSesson(@Body() body: CreateSessionDto,@Request() req) {
        const response = await this.chatService.createSession(req.user._id,body,);
        return response;
    }


    @Get('/contacts')
    async getContactsList(@Request() req) {
        const response = await this.chatService.getContacts((req.user._id).toString());
        return response;
    }

    @Get('/messages/:sessionId')
    async getChatMessage(@Param('sessionId') sessionId: string) {
        const response = await this.chatService.getChatMessage(sessionId);
        return response;
    }


    @Post('/group-message')
    async createGroupMessage(@Body() body: CreateGroupMessageDto,@Param('postId') postId: string,@Request() req) {
        const response = await this.chatService.createGroupMessage(req.user._id,body);
        return response;
    }

    @UseInterceptors(FileInterceptor('file',{  storage: FileUploadToS3.uploadFile() }))
    @Post('/group')
    async createGroup(@UploadedFile(new ParseFilePipe({fileIsRequired: true,})) file: any,
                      @Body(new ValidationPipe({transform: true})) body: CreateGroupDto,@Request() req) {
        const response = await this.chatService.createGroup(req.user._id,body,file.location);
        return response;
    }


    @Get('/group')
    async getUserGroups(@Request() req) {
        const response = await this.chatService.getUserGroups((req.user._id).toString());
        return response;
    }


    @Get('/group/recommended')
    async getRecommendedGroups(@Request() req) {
        const response = await this.chatService.getRecommendedGroups((req.user._id).toString());
        return response;
    }

    @Get('/group-messages/:sessionId')
    async getGroupMessages(@Param('sessionId') sessionId: string) {
        const response = await this.chatService.getGroupMessage(sessionId);
        return response;
    }


    @Put('/group/:groupId/add-member')
    async addGroupInMember(@Body() body: AddRemoveUserGroupDto,@Param('groupId') groupId: string,@Request() req) {
        const response = await this.chatService.addNewUserInGroup(req.user._id,groupId,body);
        return response;
    }


    @Put('/group/:groupId/remove-member')
    async removeGroupMember(@Body() body: AddRemoveUserGroupDto,@Param('groupId') groupId: string,@Request() req) {
        const response = await this.chatService.removeUserFromGroup(req.user._id,groupId,body);
        return response;
    }

    @Delete('/session')
    async removeSession(@Request() req) {
        const response = await this.chatService.deleteSession(req.user._id);
        return response;
    }
}
