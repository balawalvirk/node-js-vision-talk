import { Document } from 'mongoose';
import * as mongoose from "mongoose";
export type ChatDocument = Chat & Document;
export declare class Chat {
    session_id: any;
    sender: any;
    message: any;
    type: any;
    date_created: any;
}
export declare const ChatSchema: mongoose.Schema<Chat, mongoose.Model<Chat, any, any, any, Document<unknown, any, Chat> & Omit<Chat & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Chat, Document<unknown, {}, mongoose.FlatRecord<Chat>> & Omit<mongoose.FlatRecord<Chat> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
