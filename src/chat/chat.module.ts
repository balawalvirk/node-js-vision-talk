import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {PostSchema} from "src/posts/models/posts.model";
import {UserSchema} from "src/users/user.schema";
import {PostLikeSchema} from "src/posts/models/likes.model";
import {PostCommentSchema} from "src/posts/models/comments.model";
import {ChatSchema} from "src/chat/models/chat.model";
import {GroupSchema} from "src/chat/models/group.model";
import {ContactSchema} from "src/chat/models/contacts.model";
import {ChatGateway} from "src/gateway/chat.gateway";
import {ChatService} from "src/chat/chat.service";
import {ChatController} from "src/chat/chat.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
        {name:"User",schema:UserSchema},
        {name:"contacts",schema:ContactSchema},
        {name:"chats",schema:ChatSchema},
        {name:"groups",schema:GroupSchema}]),
  ],
  controllers: [ChatController],
  providers: [ChatService,ChatGateway],
})
export class ChatModule {}
