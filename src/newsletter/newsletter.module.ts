import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PostSchema} from "src/posts/models/posts.model";
import {PostController} from "src/posts/post.controller";
import {PostService} from "src/posts/post.service";
import {UserSchema} from "src/users/user.schema";
import {PostLikeSchema} from "src/posts/models/likes.model";
import {PostCommentSchema} from "src/posts/models/comments.model";
import {NewsLetterSchema} from "src/newsletter/models/newsletter.model";
import {NewsLetterLikeSchema} from "src/newsletter/models/likes.model";
import {NewsLetterCommentSchema} from "src/newsletter/models/comments.model";
import {NewsletterSubscriptionsSchema} from "src/newsletter/models/subscriptions.model";
import {NewsletterController} from "src/newsletter/newsletter.controller";
import {NewsletterService} from "src/newsletter/newsletter.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "User", schema: UserSchema},
            {name: 'newsletters', schema: NewsLetterSchema},
            {name: "newsletter-likes", schema: NewsLetterLikeSchema},
            {name: "newsletter-comments", schema: NewsLetterCommentSchema},
            {name:"newsletter-subscriptions-requests",schema:NewsletterSubscriptionsSchema},

        ]),

    ],
    controllers: [NewsletterController],
    providers: [NewsletterService],
})
export class NewsletterModule {
}
