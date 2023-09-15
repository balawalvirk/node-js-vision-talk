import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

export type NewsLetterDocument = NewsLetter & Document;

@Schema()
export class NewsLetter {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;


    @Prop({ type: String,default:"" })
    title;


    @Prop({ type: String,default:"" })
    details;


    @Prop({ type: String,default:"" })
    time;


    @Prop({ type: String,default:"" })
    image;

    @Prop({ type: Number,default:0 })
    comments_count;

    @Prop({ type: Number,default:0 })
    likes_count;


    @Prop({ type: Date,default:Date.now })
    date_created;

}

export const NewsLetterSchema = SchemaFactory.createForClass(NewsLetter);
