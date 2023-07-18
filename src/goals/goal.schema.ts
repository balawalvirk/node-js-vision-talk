import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

export type GoalDocument = mongoose.HydratedDocument<Goal>;

@Schema({ versionKey: false, _id: false })
class SupportingGoal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  completionDate: Date;
}

const supportingGoalSchema = SchemaFactory.createForClass(SupportingGoal);

@Schema({ timestamps: true })
export class Goal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  importance: string;

  @Prop({ required: true })
  completionDate: Date;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  achievedFeeling: string;

  @Prop({ required: true, type: [String] })
  accomplishingCharacteristics: string[];

  @Prop({ required: true, type: [String] })
  accomplishingRelationships: string[];

  @Prop({ required: true, type: [String] })
  accomplishingCharacteristicsNeeded: string[];

  @Prop({ required: true, type: [String] })
  accomplishingRelationshipsNeeded: string[];

  @Prop({ required: true, type: [supportingGoalSchema] })
  supportingGoals: SupportingGoal[];

  @Prop()
  image: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  isGoalPublic: boolean;

  @Prop()
  GoalDetails: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
