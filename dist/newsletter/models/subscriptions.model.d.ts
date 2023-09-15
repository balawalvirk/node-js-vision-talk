import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
export type NewsletterSubscriptionsDocument = NewsletterSubscriptions & Document;
export declare class NewsletterSubscriptions {
    sender: User;
    receiver: User;
    newsletter: any;
    request_state: any;
    date_created: any;
}
export declare const NewsletterSubscriptionsSchema: mongoose.Schema<NewsletterSubscriptions, mongoose.Model<NewsletterSubscriptions, any, any, any, Document<unknown, any, NewsletterSubscriptions> & Omit<NewsletterSubscriptions & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, NewsletterSubscriptions, Document<unknown, {}, mongoose.FlatRecord<NewsletterSubscriptions>> & Omit<mongoose.FlatRecord<NewsletterSubscriptions> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
