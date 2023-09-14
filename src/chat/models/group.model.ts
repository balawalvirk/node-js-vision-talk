import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {ChatMessageTypeEnum} from "src/enums/chat.enum";

export type GroupDocument = Group & Document;

@Schema()
export class Group {


    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name
    }])
    users;


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    createdBy;


    @Prop({ type: String,default:"" })
    name;


    @Prop({ type: String,default:"" })
    avatar;


    @Prop({ type: String,default:"" })
    last_message;



    @Prop({
        type: [{
            user:{type:mongoose.Schema.Types.ObjectId},
            count:{type:Number,default:0},
        }], default: {}
    })
    unread_message_count;


    @Prop({ type: Date,default:Date.now })
    last_update;

}

export const GroupSchema = SchemaFactory.createForClass(Group);
