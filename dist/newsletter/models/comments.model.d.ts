import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
export type NewsLetterCommentDocument = NewsLetterComment & Document;
export declare class NewsLetterComment {
    user: User;
    article: any;
    message: any;
    date_created: any;
    replies: any;
}
export declare const NewsLetterCommentSchema: mongoose.Schema<NewsLetterComment, mongoose.Model<NewsLetterComment, any, any, any, Document<unknown, any, NewsLetterComment> & Omit<NewsLetterComment & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NewsLetterComment, Document<unknown, {}, mongoose.FlatRecord<NewsLetterComment>> & Omit<mongoose.FlatRecord<NewsLetterComment> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
