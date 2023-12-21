import mongoose, { FilterQuery, Model } from 'mongoose';
import { BaseService } from 'src/helpers/services/base.service';
import { User, UserDocument } from './user.schema';
import { CreateFollowerFollowingDto } from "src/users/dto/user.dto";
export declare class UsersService extends BaseService<UserDocument> {
    private userModal;
    constructor(userModal: Model<UserDocument>);
    findOne(query: FilterQuery<UserDocument>): Promise<mongoose.FlattenMaps<mongoose.Document<unknown, {}, User> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Required<{
        _id: mongoose.Types.ObjectId;
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
    deleteUser(userId: string): Promise<{
        success: boolean;
        statusCode: any;
        message: any;
        data: any;
    }>;
}
