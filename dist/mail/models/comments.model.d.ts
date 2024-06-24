import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
import { Post } from "src/posts/models/posts.model";
export type PostCommentDocument = PostComment & Document;
export declare class PostComment {
    user: User;
    post: Post;
    message: any;
    date_created: any;
    replies: any;
}
export declare const PostCommentSchema: mongoose.Schema<PostComment, mongoose.Model<PostComment, any, any, any, Document<unknown, any, PostComment> & Omit<PostComment & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PostComment, Document<unknown, {}, mongoose.FlatRecord<PostComment>> & Omit<mongoose.FlatRecord<PostComment> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
