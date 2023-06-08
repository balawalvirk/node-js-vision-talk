import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthTypes } from 'src/types';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  @Prop({ default: AuthTypes.LOCAL })
  authType: string;

  @Prop()
  birthDate: Date;

  @Prop()
  avatar: string;

  @Prop()
  degree: string;

  @Prop()
  phoneNumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
