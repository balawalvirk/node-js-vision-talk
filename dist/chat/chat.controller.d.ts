import { CreatePostDto } from "src/posts/dtos/posts.dto";
import { ChatService } from "src/chat/chat.service";
import { CreateChatDto, CreateGroupDto, CreateGroupMessageDto, CreateSessionDto } from "src/chat/dto/chat.dto";
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    create(file: any, body: CreatePostDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createChat(body: CreateChatDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createChatSesson(body: CreateSessionDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getContactsList(req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getChatMessage(sessionId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createGroupMessage(body: CreateGroupMessageDto, postId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createGroup(file: any, body: CreateGroupDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getUserGroups(req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getGroupMessages(sessionId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
