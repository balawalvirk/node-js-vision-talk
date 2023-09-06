import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {OrderByEnum, PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {validateMongoId} from "src/utils/mongo";
import {Types} from "mongoose"
import {Transform, Type} from "class-transformer";




export class CreateFollowerFollowingDto {

    @Type(() => Types.ObjectId)
    @Transform(validateMongoId)
    @IsNotEmpty()
    user;

}


