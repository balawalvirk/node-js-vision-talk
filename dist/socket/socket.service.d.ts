import { Model } from 'mongoose';
import { Server } from 'socket.io';
import Cache from 'cache-manager';
import { UserDocument } from "src/users/user.schema";
import { ContactDocument } from "src/chat/models/contacts.model";
import { GroupDocument } from "src/chat/models/group.model";
import { ChatDocument } from "src/chat/models/chat.model";
export declare class SocketService {
    private cacheManager;
    private readonly usersModel;
    private readonly contactsModel;
    private readonly groupsModel;
    private readonly chatModel;
    socketServer: Server;
    constructor(cacheManager: Cache, usersModel: Model<UserDocument>, contactsModel: Model<ContactDocument>, groupsModel: Model<GroupDocument>, chatModel: Model<ChatDocument>);
    initSocket: (socketServer: Server) => void;
    emitMessage: (eventName: any, socketId: any, data: any) => void;
    updateContactCountZero: (data: any, socket: any) => Promise<void>;
    updateGroupMessageCountZero: (data: any, socket: any) => Promise<void>;
    handleUserConnected: (data: any, socket: any) => Promise<void>;
    handleUserDisconnected: (socket: any) => Promise<void>;
}
