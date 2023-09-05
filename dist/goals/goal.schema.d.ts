import * as mongoose from 'mongoose';
import { User } from 'src/users/user.schema';
export type GoalDocument = mongoose.HydratedDocument<Goal>;
declare class SupportingGoal {
    name: string;
    completionDate: Date;
}
export declare class Goal {
    name: string;
    importance: string;
    completionDate: Date;
    type: string;
    achievedFeeling: string;
    accomplishingCharacteristics: string[];
    accomplishingRelationships: string[];
    accomplishingCharacteristicsNeeded: string[];
    accomplishingRelationshipsNeeded: string[];
    supportingGoals: SupportingGoal[];
    image: string;
    images: string[];
    user: User;
    isGoalPublic: boolean;
    GoalDetails: string;
}
export declare const GoalSchema: mongoose.Schema<Goal, mongoose.Model<Goal, any, any, any, mongoose.Document<unknown, any, Goal> & Omit<Goal & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Goal, mongoose.Document<unknown, {}, mongoose.FlatRecord<Goal>> & Omit<mongoose.FlatRecord<Goal> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export {};
