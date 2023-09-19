import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
export type NewsLetterDocument = NewsLetter & Document;
export declare class NewsLetter {
    user: User;
    title: any;
    details: any;
    time: any;
    image: any;
    date_created: any;
}
export declare const NewsLetterSchema: mongoose.Schema<NewsLetter, mongoose.Model<NewsLetter, any, any, any, Document<unknown, any, NewsLetter> & Omit<NewsLetter & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NewsLetter, Document<unknown, {}, mongoose.FlatRecord<NewsLetter>> & Omit<mongoose.FlatRecord<NewsLetter> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
