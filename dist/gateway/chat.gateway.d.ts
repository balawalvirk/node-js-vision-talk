import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from "../socket/socket.service";
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private socketService;
    server: Server;
    constructor(socketService: SocketService);
    handleEvent(data: any, client: any): any;
    handleUserConnectedStatus(data: any, client: any): any;
    handleUpdateContactCountZero(data: any, client: any): any;
    handleUpdateGroupCountZero(data: any, client: any): any;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
