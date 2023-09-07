import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
export type ContactDocument = Contact & Document;
export declare class Contact {
    user: User;
    contact: User;
    last_message: any;
    unread_message_count: any;
    last_update: any;
}
export declare const ContactSchema: mongoose.Schema<Contact, mongoose.Model<Contact, any, any, any, Document<unknown, any, Contact> & Omit<Contact & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Contact, Document<unknown, {}, mongoose.FlatRecord<Contact>> & Omit<mongoose.FlatRecord<Contact> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
