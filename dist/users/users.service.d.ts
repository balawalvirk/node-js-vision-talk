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
/// <reference types="mongoose/types/inferschematype" />
import { FilterQuery, Model } from 'mongoose';
import { BaseService } from 'src/helpers/services/base.service';
import { User, UserDocument } from './user.schema';
import { CreateFollowerFollowingDto } from "src/users/dto/user.dto";
export declare class UsersService extends BaseService<UserDocument> {
    private userModal;
    constructor(userModal: Model<UserDocument>);
    findOne(query: FilterQuery<UserDocument>): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    addFollower(userId: string, body: CreateFollowerFollowingDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    addFollowing(userId: string, body: CreateFollowerFollowingDto): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deleteFollower(userId: string, followerId: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    deleteFollowing(userId: string, followingId: any): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
    getUserById(userId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
