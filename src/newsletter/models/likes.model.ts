import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

export type NewsLetterLikeDocument = NewsLetterLike & Document;

@Schema()
export class NewsLetterLike {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'NewsLetters' })
    newsletter;
}

export const NewsLetterLikeSchema = SchemaFactory.createForClass(NewsLetterLike);
