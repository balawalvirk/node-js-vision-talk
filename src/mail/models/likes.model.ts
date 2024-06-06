import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {Post} from "src/posts/models/posts.model";

export type PostLikeDocument = Comment & Document;

@Schema()
export class PostLike {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Posts' })
    post: Post;
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);
