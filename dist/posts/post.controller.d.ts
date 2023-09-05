import { CreatePostComment, CreatePostDto, CreatePostFilterDto } from "src/posts/dtos/posts.dto";
import { PostService } from "src/posts/post.service";
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    create(file: any, body: CreatePostDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getPostDetails(id: string, type: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllPosts(id: string, type: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getAllUserPosts(id: string, type: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postComment(body: CreatePostComment, postId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    postCommentReply(body: CreatePostComment, postId: string, commentId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createPostLike(postId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    createPostDislike(postId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    filteredPost(body: CreatePostFilterDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
