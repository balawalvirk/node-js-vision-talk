import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "src/users/user.schema";
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {NewsLetterSubscriptionRequestsType} from "src/enums/newsletter.enum";

export type NewsletterSubscriptionsDocument = NewsletterSubscriptions & Document;

@Schema()
export class NewsletterSubscriptions {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sender: User;


    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    receiver: User;


    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'newsletters' })
    newsletter;


    @Prop({ type: String,enum: NewsLetterSubscriptionRequestsType, default: NewsLetterSubscriptionRequestsType.INITIATED })
    request_state;


    @Prop({ type: Date,default:Date.now })
    date_created;

}

export const NewsletterSubscriptionsSchema = SchemaFactory.createForClass(NewsletterSubscriptions);
