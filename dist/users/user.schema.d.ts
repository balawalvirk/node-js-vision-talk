import { HydratedDocument } from 'mongoose';
import * as mongoose from "mongoose";
export type UserDocument = HydratedDocument<User>;
declare class LifeGoals {
    physical: string;
    emotional: string;
    intellectual: string;
    relational: string;
    professsional: string;
}
declare class PointsOfClarity {
    myValues: string;
    myWhy: string;
    myMission: string;
}
declare class FocusList {
    desire: string;
    affirmation1: string;
    affirmation2: string;
    affirmation3: string;
    affirmation4: string;
    affirmation5: string;
    affirmation6: string;
    affirmation7: string;
    affirmation8: string;
    affirmation9: string;
    affirmation10: string;
}
export declare class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    state: string;
    city: string;
    authType: string;
    birthDate: Date;
    avatar: string;
    degree: string;
    phoneNumber: string;
    tutorialVideo: string;
    lifeGoals: LifeGoals;
    pointsOfClarity: PointsOfClarity;
    focusList: FocusList;
    followers: any;
    followings: any;
    savedArticles: any;
    savedPosts: any;
    connection_status: any;
    last_seen: any;
    is_deleted: any;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export {};
