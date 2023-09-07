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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_service_1 = require("../socket/socket.service");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(socketService) {
        this.socketService = socketService;
    }
    handleEvent(data, client) {
        client.broadcast.emit("message", "received");
        return data;
    }
    handleUserConnectedStatus(data, client) {
        this.socketService.handleUserConnected(data, client);
        return data;
    }
    handleUpdateContactCountZero(data, client) {
        this.socketService.updateContactCountZero(data, client);
        return data;
    }
    handleUpdateGroupCountZero(data, client) {
        this.socketService.updateGroupMessageCountZero(data, client);
        return data;
    }
    afterInit(server) {
        this.socketService.initSocket(server);
    }
    handleDisconnect(client) {
        console.log("handleDisconnect ", client.id);
        this.socketService.handleUserDisconnected(client);
    }
    handleConnection(client, ...args) {
        console.log("connected ", client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ChatGateway.prototype, "handleEvent", null);
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('user_connected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ChatGateway.prototype, "handleUserConnectedStatus", null);
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('update_contact_count_zero'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ChatGateway.prototype, "handleUpdateContactCountZero", null);
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('update_group_count_zero'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ChatGateway.prototype, "handleUpdateGroupCountZero", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(9001, {
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map