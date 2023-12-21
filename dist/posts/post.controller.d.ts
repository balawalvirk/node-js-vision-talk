import { CreatePostComment, CreatePostDto, CreatePostFilterDto, SavePostDto, UpdatePostDto } from "src/posts/dtos/posts.dto";
import { PostService } from "src/posts/post.service";
import { GoalsService } from "src/goals/goals.service";
export declare class PostController {
    private postService;
    private readonly goalsService;
    constructor(postService: PostService, goalsService: GoalsService);
    create(file: any, body: CreatePostDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    update(file: any, body: UpdatePostDto, req: any): Promise<{
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
    savePost(body: SavePostDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    removeSavedPost(id: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getInspiredFromPeers(body: CreatePostFilterDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deletePost(req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
