import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import {BaseService} from 'src/helpers/services/base.service';
import {User, UserDocument} from './user.schema';
import {CreatePostFilterDto} from "src/posts/dtos/posts.dto";
import {CreateFollowerFollowingDto} from "src/users/dto/user.dto";
import {errorResponse, successResponse} from "src/utils/response";

@Injectable()
export class UsersService extends BaseService<UserDocument> {
    constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {
        super(userModal);
    }

    async findOne(query: FilterQuery<UserDocument>) {
        return await this.userModal.findOne(query).lean();
    }


    async addFollower(userId: string, body: CreateFollowerFollowingDto) {
        const user = await this.userModal.findById(userId);
        const findFollowerIndex=(user.followers || []).findIndex((follower)=>follower.toString()===body.user);
        if(findFollowerIndex!==-1){
            return errorResponse(400, 'Already added in followers list.');
        }
        (user.followers).push(body.user);
        const saveUser=await user.save();
        return successResponse(200, 'post', saveUser);

    }


    async addFollowing(userId: string, body: CreateFollowerFollowingDto) {
        const user = await this.userModal.findById(userId);
        const findFollowerIndex=(user.followings || []).findIndex((following)=>following.toString()===body.user);
        if(findFollowerIndex!==-1){
            return errorResponse(400, 'Already added in following list.');
        }
        (user.followings).push(body.user);
        const saveUser=await user.save();
        return successResponse(200, 'post', saveUser);
    }



    async deleteFollower(userId: string, followerId) {
        const user = await this.userModal.findById(userId);
        const findFollowerIndex=(user.followers || []).findIndex((follower)=>follower.toString()===followerId);
        if(findFollowerIndex===-1){
            return errorResponse(404, 'Follower not exist.');
        }
        user.followers=(user.followers || []).filter((follower)=>(follower).toString()!==followerId.toString())
        const saveUser=await user.save();
        return successResponse(200, 'post', saveUser);

    }


    async deleteFollowing(userId: string, followingId) {
        const user = await this.userModal.findById(userId);
        const findFollowingIndex=(user.followings || []).findIndex((following)=>following.toString()===followingId.toString());
        if(findFollowingIndex===-1){
            return errorResponse(404, 'Following not exist.');
        }
        user.followings=(user.followings || []).filter((following)=>(following).toString()!==followingId.toString())
        const saveUser=await user.save();
        return successResponse(200, 'post', saveUser);

    }

    async getUserById(userId: string) {
        const user = await this.userModal.findById(userId)
            .populate("followers",'firstName lastName email',User.name)
            .populate("followings","firstName lastName email",User.name);
        return successResponse(200, 'post', user);

    }

}
