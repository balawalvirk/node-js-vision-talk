import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
export type NewsLetterLikeDocument = NewsLetterLike & Document;
export declare class NewsLetterLike {
    user: User;
    newsletter: any;
}
export declare const NewsLetterLikeSchema: mongoose.Schema<NewsLetterLike, mongoose.Model<NewsLetterLike, any, any, any, Document<unknown, any, NewsLetterLike> & Omit<NewsLetterLike & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NewsLetterLike, Document<unknown, {}, mongoose.FlatRecord<NewsLetterLike>> & Omit<mongoose.FlatRecord<NewsLetterLike> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
