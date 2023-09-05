import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: String,default:"" })
    caption;

    @Prop({ type: String,enum: PostCategoryEnum, default: PostCategoryEnum.DEFAULT })
    category;


    @Prop({ type: String,enum: PostTypeEnum, default: PostTypeEnum.DEFAULT })
    type;


    @Prop({ type: String,default:"" })
    image;

    @Prop({ type: Number,default:0 })
    comments_count;

    @Prop({ type: Number,default:0 })
    likes_count;


    @Prop({ type: Date,default:Date.now })
    date_created;

}

export const PostSchema = SchemaFactory.createForClass(Post);
