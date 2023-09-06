/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-pass.dto';
import { UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFollowerFollowingDto } from "src/users/dto/user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    changePassword({ newPassword, oldPassword }: ChangePasswordDto, user: UserDocument): Promise<string>;
    update(file: any, updateUserDto: UpdateUserDto, user: UserDocument): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./user.schema").User> & Omit<import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("./user.schema").User> & Omit<import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    addFollower(body: CreateFollowerFollowingDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    addFollowing(body: CreateFollowerFollowingDto, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deleteFollower(followerId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deleteFollowing(followingId: string, req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getMe(req: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getUserById(id: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
