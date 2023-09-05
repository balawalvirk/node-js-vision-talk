import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
import { Post } from "src/posts/models/posts.model";
export type PostLikeDocument = Comment & Document;
export declare class PostLike {
    user: User;
    post: Post;
}
export declare const PostLikeSchema: mongoose.Schema<PostLike, mongoose.Model<PostLike, any, any, any, Document<unknown, any, PostLike> & Omit<PostLike & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PostLike, Document<unknown, {}, mongoose.FlatRecord<PostLike>> & Omit<mongoose.FlatRecord<PostLike> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
