import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {PostDocument} from "src/posts/models/posts.model";
import {CreatePostComment, CreatePostDto, CreatePostFilterDto} from "src/posts/dtos/posts.dto";
import {errorResponse, successResponse} from "src/utils/response";
import {User, UserDocument} from "src/users/user.schema";
import {PostLikeDocument} from "src/posts/models/likes.model";
import {PostCommentDocument} from "src/posts/models/comments.model";
import {OrderByEnum} from "src/enums/posts.enum";
import {ContactDocument} from "./models/contacts.model";
import {GroupDocument} from "./models/group.model";
import {ChatDocument} from "./models/chat.model";
import {
    AddRemoveUserGroupDto,
    CreateChatDto,
    CreateGroupDto,
    CreateGroupMessageDto,
    CreateSessionDto
} from "src/chat/dto/chat.dto";
import {ChatMessageTypeEnum} from "src/enums/chat.enum";
import {SocketService} from "src/socket/socket.service";
import Cache from 'cache-manager';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(User.name)
        private readonly usersModel: Model<UserDocument>,
        @InjectModel("contacts")
        private readonly contactsModel: Model<ContactDocument>,
        @InjectModel("groups")
        private readonly groupsModel: Model<GroupDocument>,
        @InjectModel("chats")
        private readonly chatModel: Model<ChatDocument>,
        private readonly socketService: SocketService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
    }

    async create(userId: string, body: CreateChatDto) {
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};
        const contact = await this.contactsModel.findById(body.sessionId);

        if (!contact)
            return errorResponse(404, 'session not found');

        const receiverId = (userId).toString() === (contact.user).toString() ? (contact.contact).toString() : (contact.user).toString()

        contact.set({
            last_message: body.type === ChatMessageTypeEnum.MESSAGE ? body.message : "uploaded file",
            last_update: new Date()
        })

        const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === receiverId);

        if (findIndex === -1) {
            contact.unread_message_count.push({user: receiverId, count: 1});
        } else {
            contact.unread_message_count[findIndex] = {
                user: receiverId,
                count: contact.unread_message_count[findIndex].count + 1
            };
        }


        const message = new this.chatModel({
            session_id: body.sessionId,
            message: body.message,
            type: body.type,
            sender: userId
        });
        const saveMessage = await message.save();
        await contact.save();
        const statusData = await this.cacheManager.get(`user-socket-${receiverId}`);
        if (statusData) {
            const parsedData = JSON.parse(statusData);
            this.socketService.emitMessage('message', parsedData.socket, {message: saveMessage});
            this.socketService.emitMessage('session', parsedData.socket, {message: saveMessage});
        }


        return successResponse(200, 'create message', saveMessage);
    }


    async createGroupMessage(userId: string, body: CreateGroupMessageDto) {
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};
        const group = await this.groupsModel.findById(body.groupId);

        if (!group)
            return errorResponse(404, 'group not found');


        group.set({
            last_message: body.type === ChatMessageTypeEnum.MESSAGE ? body.message : "uploaded file",
            last_update: new Date()
        })

        const usersInGroup = (group.users || [])
            .filter((user) => (user.toString()) !== userId.toString())


        for (let i = 0; i < usersInGroup.length; i++) {
            const user = usersInGroup[i].toString();
            const findIndex = (group.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === user.toString());
            if (findIndex === -1) {
                group.unread_message_count.push({user: user, count: 1});
            } else {
                group.unread_message_count[findIndex] = {
                    user: user,
                    count: group.unread_message_count[findIndex].count + 1
                };
            }
        }


        const message = new this.chatModel({
            session_id: body.groupId,
            message: body.message,
            type: body.type,
            sender: userId
        });
        const saveMessage = await message.save();
        await group.save();


        for (let i = 0; i < usersInGroup.length; i++) {
            const user = usersInGroup[i].toString()
            const statusData = await this.cacheManager.get(`user-socket-${user}`);
            if (statusData) {
                const parsedData = JSON.parse(statusData);
                this.socketService.emitMessage('group-message', parsedData.socket, {message: saveMessage});
            }

        }


        return successResponse(200, 'create group message', saveMessage);
    }


    async createGroup(userId: string, body: CreateGroupDto, avatar: string) {
        (body.users).push(userId.toString());
        const group = new this.groupsModel({users: body.users, name: body.name, avatar,createdBy:userId});
        const saveGroup = await group.save();

        return successResponse(200, 'create group', saveGroup);
    }


    async addNewUserInGroup(userId: string, groupId: string, body: AddRemoveUserGroupDto) {

        const group = await this.groupsModel.findById(groupId);

        if (!group)
            return errorResponse(404, 'group not found');

        const findIndex = (group.users).findIndex((user) => user.toString() === (body.userId).toString());

        if (findIndex !== -1)
            return errorResponse(400, 'already added in group');

        (group.users).push(body.userId);


        const saveGroup = await group.save();

        return successResponse(200, 'create group', saveGroup);
    }



    async removeUserFromGroup(userId: string, groupId: string, body: AddRemoveUserGroupDto) {

        const group = await this.groupsModel.findById(groupId);

        if (!group)
            return errorResponse(404, 'group not found');

        const findIndex = (group.users).findIndex((user) => user.toString() === (body.userId).toString());

        if (findIndex === -1)
            return errorResponse(400, 'user is not in group');

        (group.users).splice(findIndex,1);


        const saveGroup = await group.save();

        return successResponse(200, 'create group', saveGroup);
    }


    async createSession(userId: string, body: CreateSessionDto) {


        const previousSession = await this.contactsModel.findOne({
            $or: [{user: userId, contact: body.contact},
                {user: body.contact, contact: userId}]
        })

        if (previousSession) return successResponse(200, 'session', previousSession);

        const session = new this.contactsModel({user: userId, contact: body.contact});
        const saveSession = await session.save();

        return successResponse(200, 'create session', saveSession);
    }


    async getContacts(userId: string) {
        const contactsList = await this.contactsModel.find({
            $or: [{user: new mongoose.Types.ObjectId(userId)},
                {contact: new mongoose.Types.ObjectId(userId)}]
        })
            .populate("user", '_id firstName lastName email avatar connection_status last_seen', User.name)
            .populate("contact", "_id firstName lastName email avatar connection_status last_seen", User.name)
            .sort({last_update: -1})
            .lean();

        let filteredContacts = JSON.parse(JSON.stringify(contactsList)).map((contact) => {
            if ((contact.user._id).toString() === userId) {
                contact.user = contact.contact;
            } else {
                contact.user = contact.user
            }
            const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === userId);
            if (findIndex === -1) {
                contact.count = 0;
            } else {
                contact.count = contact.unread_message_count[findIndex]
            }


            delete contact.contact;
            delete contact.unread_message_count;

            return contact;
        })


        return successResponse(200, 'contacts list', filteredContacts);
    }


    async getUserGroups(userId: string) {
        const groupList = await this.groupsModel.find({users: {$in: [new mongoose.Types.ObjectId(userId)]}})
            .populate("createdBy", '_id firstName lastName email avatar connection_status last_seen', User.name)
            .populate("users", '_id firstName lastName email avatar connection_status last_seen', User.name)
            .sort({last_update: -1})
            .lean();

        let filteredGroups = JSON.parse(JSON.stringify(groupList)).map((contact) => {

            const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() ===
                userId.toString());
            if (findIndex === -1) {
                contact.count = 0;
            } else {
                contact.count = contact.unread_message_count[findIndex]
            }


            delete contact.unread_message_count;

            return contact;
        })


        return successResponse(200, 'groups list', filteredGroups);
    }


    async getChatMessage(sessionId: string) {
        const chatMessages = await this.chatModel.find({session_id: new mongoose.Types.ObjectId(sessionId)})
            .sort({date_created: -1})
            .lean();

        return successResponse(200, 'chat message', chatMessages);
    }


    async getGroupMessage(sessionId: string) {
        const chatMessages = await this.chatModel.find({session_id: new mongoose.Types.ObjectId(sessionId)})
            .populate("sender", '_id firstName lastName email avatar connection_status last_seen', User.name)
            .sort({date_created: -1})
            .lean();

        return successResponse(200, 'chat message', chatMessages);
    }


    async deleteSession(userId: string) {


        const previousSession = await this.contactsModel.findOneAndRemove({
            $or: [{user: userId}, {contact: userId}]
        })

        return successResponse(200, 'session', previousSession);
    }


}
