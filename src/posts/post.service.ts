import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {PostDocument} from "src/posts/models/posts.model";
import {CreatePostComment, CreatePostDto, CreatePostFilterDto, SavePostDto} from "src/posts/dtos/posts.dto";
import {errorResponse, successResponse} from "src/utils/response";
import {User, UserDocument} from "src/users/user.schema";
import {PostLikeDocument} from "src/posts/models/likes.model";
import {PostCommentDocument} from "src/posts/models/comments.model";
import {OrderByEnum} from "src/enums/posts.enum";
import {SaveArticleDto} from "src/newsletter/dtos/newsletter.dto";

@Injectable()
export class PostService {
    constructor(
        @InjectModel('posts')
        private readonly postsModel: Model<PostDocument>,
        @InjectModel(User.name)
        private readonly usersModel: Model<UserDocument>,
        @InjectModel("post-likes")
        private readonly postLikeModel: Model<PostLikeDocument>,
        @InjectModel("post-comments")
        private readonly postCommentsModel: Model<PostCommentDocument>,



    ) {
    }

    async create(body: CreatePostDto, fileName: string, user: string) {
        const post = new this.postsModel({...body, image: fileName, user});
        const savePost = await post.save();
        return successResponse(200, 'post created', savePost);
    }




    async getAllPosts(userId,type:string) {
        const post = await this.postsModel.aggregate([
            {$match: {type}},

            {
                $lookup: {
                    from: "post-likes",
                    let: {post: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$post', '$$post']},
                                        {$eq: ['$user', userId]}
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $addFields: {
                    own_like: {$cond: {if: {$gt:[{$size:"$like_data"}, 0]}, then: true, else: false}}

                }
            },
            { $unset: [ "like_data" ] }
        ])


        if(!post)
            return errorResponse(404, 'post not found');

        await this.postsModel.populate(post, {path: "user",select:"firstName lastName email avatar"});


        return successResponse(200, 'post', post);
    }



    async getUserPosts(userId) {
        const post = await this.postsModel.aggregate([
            {$match: {user:new mongoose.Types.ObjectId(userId)}},
        ])


        if(!post)
            return errorResponse(404, 'post not found');



        return successResponse(200, 'post', post);
    }




    async getPostDetails(userId,postId:string,type:string) {
        const post = await this.postsModel.aggregate([
            {$match: {_id:new mongoose.Types.ObjectId(postId),type}},
            {
                $lookup: {
                    from: 'post-comments',
                    localField: '_id',
                    foreignField: 'post',
                    as: 'comments',
                },
            },
            {
                $lookup: {
                    from: "post-likes",
                    let: {post: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$post', '$$post']},
                                        {$eq: ['$user', userId]}
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $addFields: {
                    own_like: {$cond: {if: {$gt:[{$size:"$like_data"}, 0]}, then: true, else: false}}

                }
            },
            { $unset: [ "like_data" ] }
        ])


        if(!post)
            return errorResponse(404, 'post not found');

        await this.postsModel.populate(post, {path: "user",select:"firstName lastName email avatar"});
        await this.postsModel.populate(post, {path: "comments.user",model:"User",select:"firstName lastName email avatar"});
        await this.postsModel.populate(post, {path: "comments.replies.user",model:"User",select:"firstName lastName email avatar"});


        return successResponse(200, 'post', post);
    }



    async getFilteredPosts(userId:string,body: CreatePostFilterDto) {

        let query={};

        if(body.category) query={...query,category:body.category}

        if(body.type) query={...query,type:body.type};

        const post = await this.postsModel.aggregate([
            {$match: {...query}},

            {
                $lookup: {
                    from: "post-likes",
                    let: {post: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ['$post', '$$post']},
                                        {$eq: ['$user', userId]}
                                    ]
                                }
                            }
                        },
                    ],
                    as: 'like_data'
                },
            },
            {
                $addFields: {
                    own_like: {$cond: {if: {$gt:[{$size:"$like_data"}, 0]}, then: true, else: false}}

                }
            },
            { $unset: [ "like_data" ] },
            {$sort: {date_created: (body.order_by || OrderByEnum.DESCENDING)===OrderByEnum.DESCENDING?-1:1}}

        ])


        if(!post)
            return errorResponse(404, 'post not found');

        await this.postsModel.populate(post, {path: "user",select:"firstName lastName email avatar"});


        return successResponse(200, 'post', post);
    }



    async postComment(body: CreatePostComment, user:string,postId:string) {

        const post=await this.postsModel.findById(postId)

        if(!post)
            return errorResponse(404, 'post not found');

        post.comments_count=post.comments_count+1;
        await post.save();

        const postComment = new this.postCommentsModel({...body, user,post:postId});
        const savePostComment = await postComment.save();
        return successResponse(200, 'comment created', savePostComment);
    }


    async replyPostComment(body: CreatePostComment, user:string,postId:string,commentId:string) {

        const post=await this.postsModel.findById(postId)

        if(!post)
            return errorResponse(404, 'post not found');


        const postComment=await this.postCommentsModel.findById(commentId)

        if(!postComment)
            return errorResponse(404, 'post comment not found');

        postComment.replies.push({...body,user})

        const savePostComment = await postComment.save();
        return successResponse(200, 'reply saved', savePostComment);
    }


    async postLike(user:string,postId:string) {

        const post=await this.postsModel.findById(postId)

        if(!post)
            return errorResponse(404, 'post not found');


        const postLike = await this.postLikeModel.findOne({ user,post:postId});

        if(postLike)
            return errorResponse(400, 'already liked this post');



        post.likes_count=post.likes_count+1;
        await post.save();




        const createPostLike = new this.postLikeModel({ user,post:postId});
        const savePostLike = await createPostLike.save();
        return successResponse(200, 'post like created', savePostLike);
    }


    async postDisLike(user:string,postId:string) {

        const post=await this.postsModel.findById(postId)

        if(!post)
            return errorResponse(404, 'post not found');


        const postLike = await this.postLikeModel.findOneAndRemove({ user,post:postId});

        if(!postLike)
            return errorResponse(404, 'post like not found');



        post.likes_count=post.likes_count-1;
        await post.save();



        return successResponse(200, 'post like removed', postLike);
    }




    async savePostForUser(userId: string,payload:SavePostDto) {

        const user:any=await this.usersModel.findById(userId);
        const post=await this.postsModel.findById(payload.post)

        if(!post)
            return errorResponse(404, 'post not found');



        const findIndex=(user.savedPosts || []).indexOf(payload.post);

        let savedPosts=user.savedPosts || [];

        if(findIndex===-1){
            savedPosts.push(payload.post)
        }
        user.savedPosts=savedPosts

        const saveUser=await user.save();


        return successResponse(200, 'post save', saveUser);
    }


    async removeSavedPostForUser(userId: string,postId:string) {

        const user:any=await this.usersModel.findById(userId);
        const post=await this.postsModel.findById(postId)

        if(!post)
            return errorResponse(404, 'post not found');



        const findIndex=(user.savedPosts || []).indexOf(postId);

        let savedPosts=user.savedPosts || [];

        if(findIndex!==-1){
            savedPosts.splice(findIndex,1)
        }
        user.savedPosts=savedPosts

        const saveUser=await user.save();


        return successResponse(200, 'saved post removed', saveUser);
    }


}
