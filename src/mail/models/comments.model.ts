import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {Post} from "src/posts/models/posts.model";

export type PostCommentDocument = PostComment & Document;

@Schema()
export class PostComment {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'posts' })
    post: Post;

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

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
