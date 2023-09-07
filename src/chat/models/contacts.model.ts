import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    contact: User;


    @Prop({type: String, default: ""})
    last_message;


    @Prop({
        type: [{
            user:{type:mongoose.Schema.Types.ObjectId},
            count:{type:Number,default:0},
        }], default: {}
    })
    unread_message_count;


    @Prop({type: Date, default: Date.now})
    last_update;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);
