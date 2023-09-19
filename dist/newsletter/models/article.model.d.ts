import { Document } from 'mongoose';
import * as mongoose from "mongoose";
export type ArticleDocument = Article & Document;
export declare class Article {
    newsletter: any;
    title: any;
    details: any;
    time: any;
    image: any;
    comments_count: any;
    likes_count: any;
    date_created: any;
}
export declare const ArticleSchema: mongoose.Schema<Article, mongoose.Model<Article, any, any, any, Document<unknown, any, Article> & Omit<Article & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Article, Document<unknown, {}, mongoose.FlatRecord<Article>> & Omit<mongoose.FlatRecord<Article> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
