import { Document } from 'mongoose';
import * as mongoose from "mongoose";
export type GroupDocument = Group & Document;
export declare class Group {
    users: any;
    name: any;
    avatar: any;
    last_message: any;
    unread_message_count: any;
    last_update: any;
}
export declare const GroupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, Document<unknown, any, Group> & Omit<Group & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group, Document<unknown, {}, mongoose.FlatRecord<Group>> & Omit<mongoose.FlatRecord<Group> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
