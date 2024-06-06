import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PostSchema} from "src/posts/models/posts.model";
import {PostController} from "src/posts/post.controller";
import {PostService} from "src/posts/post.service";
import {UserSchema} from "src/users/user.schema";
import {PostLikeSchema} from "src/posts/models/likes.model";
import {PostCommentSchema} from "src/posts/models/comments.model";
import {GoalsService} from "src/goals/goals.service";
import {Goal, GoalSchema} from "src/goals/goal.schema";
import {EmailController} from "src/mail/email.controller";
import {EmailService} from "src/mail/email.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        ]),
    ],
    controllers: [EmailController],
    providers: [EmailService,],
})
export class EmailModule {
}
