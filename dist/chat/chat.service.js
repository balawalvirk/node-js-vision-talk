"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_1 = require("../utils/response");
const user_schema_1 = require("../users/user.schema");
const chat_enum_1 = require("../enums/chat.enum");
const socket_service_1 = require("../socket/socket.service");
const cache_manager_1 = require("cache-manager");
let ChatService = exports.ChatService = class ChatService {
    constructor(usersModel, contactsModel, groupsModel, chatModel, socketService, cacheManager) {
        this.usersModel = usersModel;
        this.contactsModel = contactsModel;
        this.groupsModel = groupsModel;
        this.chatModel = chatModel;
        this.socketService = socketService;
        this.cacheManager = cacheManager;
    }
    async create(userId, body) {
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const contact = await this.contactsModel.findById(body.sessionId);
        if (!contact)
            return (0, response_1.errorResponse)(404, 'session not found');
        const receiverId = (userId).toString() === (contact.user).toString() ? (contact.contact).toString() : (contact.user).toString();
        contact.set({
            last_message: body.type === chat_enum_1.ChatMessageTypeEnum.MESSAGE ? body.message : "uploaded file",
            last_update: new Date()
        });
        const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === receiverId);
        if (findIndex === -1) {
            contact.unread_message_count.push({ user: receiverId, count: 1 });
        }
        else {
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
            this.socketService.emitMessage('message', parsedData.socket, { message: saveMessage });
            this.socketService.emitMessage('session', parsedData.socket, { message: saveMessage });
        }
        return (0, response_1.successResponse)(200, 'create message', saveMessage);
    }
    async createGroupMessage(userId, body) {
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const group = await this.groupsModel.findById(body.groupId);
        if (!group)
            return (0, response_1.errorResponse)(404, 'group not found');
        group.set({
            last_message: body.type === chat_enum_1.ChatMessageTypeEnum.MESSAGE ? body.message : "uploaded file",
            last_update: new Date()
        });
        const usersInGroup = (group.users || [])
            .filter((user) => (user.toString()) !== userId.toString());
        for (let i = 0; i < usersInGroup.length; i++) {
            const user = usersInGroup[i].toString();
            const findIndex = (group.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === user.toString());
            if (findIndex === -1) {
                group.unread_message_count.push({ user: user, count: 1 });
            }
            else {
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
            const user = usersInGroup[i].toString();
            const statusData = await this.cacheManager.get(`user-socket-${user}`);
            if (statusData) {
                const parsedData = JSON.parse(statusData);
                this.socketService.emitMessage('group-message', parsedData.socket, { message: saveMessage });
            }
        }
        return (0, response_1.successResponse)(200, 'create group message', saveMessage);
    }
    async createGroup(userId, body, avatar) {
        (body.users).push(userId.toString());
        const group = new this.groupsModel({ users: body.users, name: body.name, avatar, createdBy: userId });
        const saveGroup = await group.save();
        return (0, response_1.successResponse)(200, 'create group', saveGroup);
    }
    async addNewUserInGroup(userId, groupId, body) {
        const group = await this.groupsModel.findById(groupId);
        if (!group)
            return (0, response_1.errorResponse)(404, 'group not found');
        const findIndex = (group.users).findIndex((user) => user.toString() === (body.userId).toString());
        if (findIndex !== -1)
            return (0, response_1.errorResponse)(400, 'already added in group');
        (group.users).push(body.userId);
        const saveGroup = await group.save();
        return (0, response_1.successResponse)(200, 'create group', saveGroup);
    }
    async removeUserFromGroup(userId, groupId, body) {
        const group = await this.groupsModel.findById(groupId);
        if (!group)
            return (0, response_1.errorResponse)(404, 'group not found');
        const findIndex = (group.users).findIndex((user) => user.toString() === (body.userId).toString());
        if (findIndex === -1)
            return (0, response_1.errorResponse)(400, 'user is not in group');
        (group.users).splice(findIndex, 1);
        const saveGroup = await group.save();
        return (0, response_1.successResponse)(200, 'create group', saveGroup);
    }
    async createSession(userId, body) {
        const previousSession = await this.contactsModel.findOne({
            $or: [{ user: userId, contact: body.contact },
                { user: userId, contact: body.contact }]
        });
        if (previousSession)
            return (0, response_1.successResponse)(200, 'session', previousSession);
        const session = new this.contactsModel({ user: userId, contact: body.contact });
        const saveSession = await session.save();
        return (0, response_1.successResponse)(200, 'create session', saveSession);
    }
    async getContacts(userId) {
        const contactsList = await this.contactsModel.find({
            $or: [{ user: new mongoose_2.default.Types.ObjectId(userId) },
                { contact: new mongoose_2.default.Types.ObjectId(userId) }]
        })
            .populate("user", '_id firstName lastName email avatar connection_status last_seen', user_schema_1.User.name)
            .populate("contact", "_id firstName lastName email avatar connection_status last_seen", user_schema_1.User.name)
            .sort({ last_update: -1 })
            .lean();
        let filteredContacts = JSON.parse(JSON.stringify(contactsList)).map((contact) => {
            if ((contact.user._id).toString() === userId) {
                contact.user = contact.contact;
            }
            else {
                contact.user = contact.user;
            }
            const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === userId);
            if (findIndex === -1) {
                contact.count = 0;
            }
            else {
                contact.count = contact.unread_message_count[findIndex];
            }
            delete contact.contact;
            delete contact.unread_message_count;
            return contact;
        });
        return (0, response_1.successResponse)(200, 'contacts list', filteredContacts);
    }
    async getUserGroups(userId) {
        const groupList = await this.groupsModel.find({ users: { $in: [new mongoose_2.default.Types.ObjectId(userId)] } })
            .populate("createdBy", '_id firstName lastName email avatar connection_status last_seen', user_schema_1.User.name)
            .populate("users", '_id firstName lastName email avatar connection_status last_seen', user_schema_1.User.name)
            .sort({ last_update: -1 })
            .lean();
        let filteredGroups = JSON.parse(JSON.stringify(groupList)).map((contact) => {
            const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() ===
                userId.toString());
            if (findIndex === -1) {
                contact.count = 0;
            }
            else {
                contact.count = contact.unread_message_count[findIndex];
            }
            delete contact.unread_message_count;
            return contact;
        });
        return (0, response_1.successResponse)(200, 'groups list', filteredGroups);
    }
    async getChatMessage(sessionId) {
        const chatMessages = await this.chatModel.find({ session_id: new mongoose_2.default.Types.ObjectId(sessionId) })
            .sort({ date_created: -1 })
            .lean();
        return (0, response_1.successResponse)(200, 'chat message', chatMessages);
    }
    async getGroupMessage(sessionId) {
        const chatMessages = await this.chatModel.find({ session_id: new mongoose_2.default.Types.ObjectId(sessionId) })
            .populate("sender", '_id firstName lastName email avatar connection_status last_seen', user_schema_1.User.name)
            .sort({ date_created: -1 })
            .lean();
        return (0, response_1.successResponse)(200, 'chat message', chatMessages);
    }
};
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)("contacts")),
    __param(2, (0, mongoose_1.InjectModel)("groups")),
    __param(3, (0, mongoose_1.InjectModel)("chats")),
    __param(5, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        socket_service_1.SocketService, typeof (_a = typeof cache_manager_1.default !== "undefined" && cache_manager_1.default) === "function" ? _a : Object])
], ChatService);
//# sourceMappingURL=chat.service.js.map