import { Model } from 'mongoose';
import { UserDocument } from "src/users/user.schema";
import { ContactDocument } from "./models/contacts.model";
import { GroupDocument } from "./models/group.model";
import { ChatDocument } from "./models/chat.model";
import { CreateChatDto, CreateGroupDto, CreateGroupMessageDto, CreateSessionDto } from "src/chat/dto/chat.dto";
import { SocketService } from "src/socket/socket.service";
import Cache from 'cache-manager';
export declare class ChatService {
    private readonly usersModel;
    private readonly contactsModel;
    private readonly groupsModel;
    private readonly chatModel;
    private readonly socketService;
    private cacheManager;
    constructor(usersModel: Model<UserDocument>, contactsModel: Model<ContactDocument>, groupsModel: Model<GroupDocument>, chatModel: Model<ChatDocument>, socketService: SocketService, cacheManager: Cache);
    create(userId: string, body: CreateChatDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createGroupMessage(userId: string, body: CreateGroupMessageDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createGroup(userId: string, body: CreateGroupDto, avatar: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createSession(userId: string, body: CreateSessionDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getContacts(userId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getUserGroups(userId: string): Promise<{
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
    getGroupMessage(sessionId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
