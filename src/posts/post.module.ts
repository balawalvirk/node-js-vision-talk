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

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'posts', schema: PostSchema},
            {name: "User", schema: UserSchema},
            {name: "post-likes", schema: PostLikeSchema},
            {name: "post-comments", schema: PostCommentSchema},
            {name: Goal.name, schema: GoalSchema}
        ]),
    ],
    controllers: [PostController],
    providers: [PostService, GoalsService],
})
export class PostModule {
}
