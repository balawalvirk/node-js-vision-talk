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
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cache_manager_1 = require("cache-manager");
const user_schema_1 = require("../users/user.schema");
const chat_enum_1 = require("../enums/chat.enum");
let SocketService = exports.SocketService = class SocketService {
    constructor(cacheManager, usersModel, contactsModel, groupsModel, chatModel) {
        this.cacheManager = cacheManager;
        this.usersModel = usersModel;
        this.contactsModel = contactsModel;
        this.groupsModel = groupsModel;
        this.chatModel = chatModel;
        this.socketServer = null;
        this.initSocket = (socketServer) => {
            console.log("initsocket = ");
            this.socketServer = socketServer;
        };
        this.emitMessage = (eventName, socketId, data) => {
            if (this.socketServer)
                this.socketServer.to(socketId).emit(eventName, data);
            else
                console.log('socket not found');
        };
        this.updateContactCountZero = async (data, socket) => {
            const contact = await this.contactsModel.findById(data.session_id);
            if (contact) {
                const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === (data.user_id));
                if (findIndex === -1) {
                    contact.unread_message_count.push({ user: data.user_id, count: 0 });
                }
                else {
                    contact.unread_message_count[findIndex] = {
                        user: data.user_id,
                        count: 0
                    };
                }
                await contact.save();
            }
        };
        this.updateGroupMessageCountZero = async (data, socket) => {
            const group = await this.groupsModel.findById(data.group_id);
            if (group) {
                const findIndex = (group.unread_message_count || []).findIndex((user) => (user.user || "").toString() === (data.user_id));
                if (findIndex === -1) {
                    group.unread_message_count.push({ user: data.user_id, count: 0 });
                }
                else {
                    group.unread_message_count[findIndex] = {
                        user: data.user_id,
                        count: 0
                    };
                }
                await group.save();
            }
        };
        this.handleUserConnected = async (data, socket) => {
            console.log("handleUserConnected  = ", data.body, '   ', socket.id);
            const user_id = data.user_id;
            await this.cacheManager.set(socket.id, JSON.stringify({ user_id, date: new Date().toISOString() }), { ttl: 86400 });
            await this.cacheManager.set(`user-socket-${user_id}`, JSON.stringify({ socket: socket.id, date: new Date().toISOString() }), { ttl: 86400 });
            await this.usersModel.findByIdAndUpdate(user_id, { connection_status: chat_enum_1.STATUS.ONLINE, last_seen: new Date() }, { upsert: true });
        };
        this.handleUserDisconnected = async (socket) => {
            const statusData = await this.cacheManager.get(`${socket.id}`);
            await this.cacheManager.del(`${socket.id}`);
            if (statusData) {
                const parsedStatusData = JSON.parse(statusData);
                await this.cacheManager.del(`user-socket-${parsedStatusData.user_id}`);
                if (parsedStatusData.user_id) {
                    await this.usersModel.findByIdAndUpdate(parsedStatusData.user_id, { connection_status: chat_enum_1.STATUS.OFFLINE }, { upsert: true });
                }
            }
        };
    }
};
exports.SocketService = SocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)("contacts")),
    __param(3, (0, mongoose_1.InjectModel)("groups")),
    __param(4, (0, mongoose_1.InjectModel)("chats")),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.default !== "undefined" && cache_manager_1.default) === "function" ? _a : Object, mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SocketService);
//# sourceMappingURL=socket.service.js.map