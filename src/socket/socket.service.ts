import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {errorResponse, successResponse} from '../utils/response';
import axios from 'axios';
import {JwtService} from '@nestjs/jwt';
import { Socket, Server } from 'socket.io';
import Cache  from 'cache-manager';
import {User, UserDocument} from "src/users/user.schema";
import {ContactDocument} from "src/chat/models/contacts.model";
import {GroupDocument} from "src/chat/models/group.model";
import {ChatDocument} from "src/chat/models/chat.model";
import {STATUS} from "src/enums/chat.enum";


@Injectable()
export class SocketService {
    public socketServer: Server = null;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectModel(User.name)
        private readonly usersModel: Model<UserDocument>,
        @InjectModel("contacts")
        private readonly contactsModel: Model<ContactDocument>,
        @InjectModel("groups")
        private readonly groupsModel: Model<GroupDocument>,
        @InjectModel("chats")
        private readonly chatModel: Model<ChatDocument>,


    ) {
    }

    initSocket=(socketServer: Server)=>{
        console.log("initsocket = ");
        this.socketServer=socketServer;
    }

    emitMessage=(eventName,socketId,data)=>{
        if(this.socketServer) this.socketServer.to(socketId).emit(eventName,data);
        else console.log('socket not found');
    }


    updateContactCountZero=async (data:any,socket:any)=>{
        const contact=await this.contactsModel.findById(data.session_id);
        if(contact){
            const findIndex = (contact.unread_message_count || []).findIndex((unread) => (unread.user || "").toString() === (data.user_id));
            if (findIndex === -1) {
                contact.unread_message_count.push({user: data.user_id, count: 0});
            } else {
                contact.unread_message_count[findIndex] = {
                    user: data.user_id,
                    count: 0
                };
            }
            await contact.save()
        }

    }


    updateGroupMessageCountZero=async (data:any,socket:any)=>{
        const group=await this.groupsModel.findById(data.group_id);
        if(group){
            const findIndex = (group.unread_message_count || []).findIndex((user) => (user.user || "").toString() === (data.user_id));
            if (findIndex === -1) {
                group.unread_message_count.push({user: data.user_id, count: 0});
            } else {
                group.unread_message_count[findIndex] = {
                    user: data.user_id,
                    count: 0
                };
            }
            await group.save();
        }
    }


    handleUserConnected=async (data:any,socket:any)=>{
        console.log("handleUserConnected  = ",data.body,'   ',socket.id);
        const user_id=data.user_id;
        await this.cacheManager.set(socket.id,JSON.stringify({user_id,date:new Date().toISOString()}), {ttl:86400});
        await this.cacheManager.set(`user-socket-${user_id}`,JSON.stringify({socket:socket.id,date:new Date().toISOString()}), {ttl:86400});

        await this.usersModel.findByIdAndUpdate(user_id,{connection_status:STATUS.ONLINE,last_seen:new Date()},{upsert:true});
    }






    handleUserDisconnected=async (socket:any)=>{
        const statusData=await this.cacheManager.get(`${socket.id}`);
        await this.cacheManager.del(`${socket.id}`)
        if(statusData){
            const parsedStatusData=JSON.parse(statusData);
            await this.cacheManager.del(`user-socket-${parsedStatusData.user_id}`)
            if(parsedStatusData.user_id){
                await this.usersModel.findByIdAndUpdate(parsedStatusData.user_id,{connection_status:STATUS.OFFLINE},{upsert:true});

            }
        }
    }




}
