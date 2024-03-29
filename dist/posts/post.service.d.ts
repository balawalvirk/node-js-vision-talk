import { Model } from 'mongoose';
import { PostDocument } from "src/posts/models/posts.model";
import { CreatePostComment, CreatePostDto, CreatePostFilterDto, SavePostDto, UpdatePostDto } from "src/posts/dtos/posts.dto";
import { UserDocument } from "src/users/user.schema";
import { PostLikeDocument } from "src/posts/models/likes.model";
import { PostCommentDocument } from "src/posts/models/comments.model";
export declare class PostService {
    private readonly postsModel;
    private readonly usersModel;
    private readonly postLikeModel;
    private readonly postCommentsModel;
    constructor(postsModel: Model<PostDocument>, usersModel: Model<UserDocument>, postLikeModel: Model<PostLikeDocument>, postCommentsModel: Model<PostCommentDocument>);
    create(body: CreatePostDto, fileName: string, user: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    updatePost(body: UpdatePostDto, fileName: string, id: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllPosts(userId: any, type: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getUserPosts(userId: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getPostDetails(userId: any, postId: string, type: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getFilteredPosts(userId: string, body: CreatePostFilterDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postComment(body: CreatePostComment, user: string, postId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    replyPostComment(body: CreatePostComment, user: string, postId: string, commentId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postLike(user: string, postId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postDisLike(user: string, postId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    savePostForUser(userId: string, payload: SavePostDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    removeSavedPostForUser(userId: string, postId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deletePost(id: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
