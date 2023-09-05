/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument } from 'mongoose';
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
    authType: string;
    birthDate: Date;
    avatar: string;
    degree: string;
    phoneNumber: string;
    lifeGoals: LifeGoals;
    pointsOfClarity: PointsOfClarity;
    focusList: FocusList;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & Omit<User & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & Omit<import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export {};
