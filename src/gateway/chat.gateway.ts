import {Bind, Injectable} from "@nestjs/common";
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import {ChatService} from "../chat/chat.service";
import {SocketService} from "../socket/socket.service";


@WebSocketGateway(9010,{
    cors: {
        origin: '*',
    },
})

@Injectable()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer()
    server: Server;

    constructor(private socketService: SocketService) {
    }

    @Bind(MessageBody(), ConnectedSocket())
    @SubscribeMessage('events')
    handleEvent(data,client): any {
        client.broadcast.emit("message","received")
        return data;
    }








    @Bind(MessageBody(), ConnectedSocket())
    @SubscribeMessage('user_connected')
    handleUserConnectedStatus(data,client): any {
        this.socketService.handleUserConnected(data,client);
        return data;
    }


    @Bind(MessageBody(), ConnectedSocket())
    @SubscribeMessage('update_contact_count_zero')
    handleUpdateContactCountZero(data,client): any {
        this.socketService.updateContactCountZero(data,client);
        return data;
    }


    @Bind(MessageBody(), ConnectedSocket())
    @SubscribeMessage('update_group_count_zero')
    handleUpdateGroupCountZero(data,client): any {
        this.socketService.updateGroupMessageCountZero(data,client);
        return data;
    }


    afterInit(server: Server) {
        this.socketService.initSocket(server);
    }

    handleDisconnect(client: Socket) {
        console.log("handleDisconnect ",client.id);
        this.socketService.handleUserDisconnected(client);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log("connected ",client.id)

    }
}
