import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

export type NewsLetterCommentDocument = NewsLetterComment & Document;

@Schema()
export class NewsLetterComment {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'articles' })
    article;

    @Prop({ type: String,default:"" })
    message;



    @Prop({ type: Date,default:Date.now })
    date_created;


    @Prop({
        type: [
            {
                user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
                message: {type: String, default: ""},
                date_created: {type: Date, default: Date.now},

            },
        ],
        default: [],
    })
    replies;

}

export const NewsLetterCommentSchema = SchemaFactory.createForClass(NewsLetterComment);
