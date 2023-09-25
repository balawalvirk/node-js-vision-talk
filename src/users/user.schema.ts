import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {AuthTypes} from 'src/types';
import * as mongoose from "mongoose";
import {ChatMessageTypeEnum, STATUS} from "src/enums/chat.enum";

export type UserDocument = HydratedDocument<User>;

@Schema({versionKey: false, _id: false})
class LifeGoals {
    @Prop({required: true})
    physical: string;

    @Prop({required: true})
    emotional: string;

    @Prop({required: true})
    intellectual: string;

    @Prop({required: true})
    relational: string;

    @Prop({required: true})
    professsional: string;
}

const lifeGoalsSchema = SchemaFactory.createForClass(LifeGoals);

@Schema({versionKey: false, _id: false})
class PointsOfClarity {
    @Prop({required: true})
    myValues: string;

    @Prop({required: true})
    myWhy: string;

    @Prop({required: true})
    myMission: string;
}

const PointsOfClaritySchema = SchemaFactory.createForClass(PointsOfClarity);

@Schema({versionKey: false, _id: false})
class FocusList {
    @Prop({required: false})
    desire: string;

    @Prop({required: false})
    affirmation1: string;

    @Prop({required: false})
    affirmation2: string;

    @Prop({required: false})
    affirmation3: string;

    @Prop({required: false})
    affirmation4: string;

    @Prop({required: false})
    affirmation5: string;

    @Prop({required: false})
    affirmation6: string;

    @Prop({required: false})
    affirmation7: string;

    @Prop({required: false})
    affirmation8: string;

    @Prop({required: false})
    affirmation9: string;

    @Prop({required: false})
    affirmation10: string;
}

const FocusListSchema = SchemaFactory.createForClass(FocusList);

@Schema({timestamps: true})
export class User {
    @Prop({required: true, lowercase: true, trim: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({trim: true})
    firstName: string;

    @Prop({trim: true})
    lastName: string;

    @Prop({default: AuthTypes.LOCAL})
    authType: string;

    @Prop()
    birthDate: Date;

    @Prop()
    avatar: string;

    @Prop()
    degree: string;

    @Prop()
    phoneNumber: string;

    @Prop({type: lifeGoalsSchema})
    lifeGoals: LifeGoals;

    @Prop({type: PointsOfClaritySchema})
    pointsOfClarity: PointsOfClarity;

    @Prop({type: FocusListSchema})
    focusList: FocusList;

    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name
    }])
    followers;

    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name
    }])
    followings;


    @Prop({ type: String,enum: STATUS, default: STATUS.OFFLINE })
    connection_status;

    @Prop({ type: Date,default:Date.now })
    last_seen;

}

export const UserSchema = SchemaFactory.createForClass(User);
