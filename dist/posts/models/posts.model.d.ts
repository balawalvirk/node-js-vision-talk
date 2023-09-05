import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
export type PostDocument = Post & Document;
export declare class Post {
    user: User;
    caption: any;
    category: any;
    type: any;
    image: any;
    comments_count: any;
    likes_count: any;
    date_created: any;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, Document<unknown, any, Post> & Omit<Post & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, Document<unknown, {}, mongoose.FlatRecord<Post>> & Omit<mongoose.FlatRecord<Post> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
