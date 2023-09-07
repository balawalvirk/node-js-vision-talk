import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {ChatMessageTypeEnum} from "src/enums/chat.enum";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    session_id ;


    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    sender ;



    @Prop({ type: String,default:"" })
    message;


    @Prop({ type: String,enum: ChatMessageTypeEnum, default: ChatMessageTypeEnum.DEFAULT })
    type;


    @Prop({ type: Date,default:Date.now })
    date_created;

}

export const ChatSchema = SchemaFactory.createForClass(Chat);
