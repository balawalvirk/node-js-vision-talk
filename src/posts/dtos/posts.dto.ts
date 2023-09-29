import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {OrderByEnum, PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    caption;


    @IsEnum(PostCategoryEnum)
    @IsString()
    category;

    @IsEnum(PostTypeEnum)
    @IsString()
    type;

}


export class CreatePostComment {

    @IsString()
    @IsNotEmpty()
    message;

}



export class CreatePostFilterDto {

    @IsOptional()
    @IsEnum(PostCategoryEnum)
    @IsString()
    category;

    @IsOptional()
    @IsEnum(PostTypeEnum)
    @IsString()
    type;


    @IsOptional()
    @IsEnum(OrderByEnum)
    @IsString()
    order_by;

}



export class SavePostDto {

    @IsString()
    @IsNotEmpty()
    post;


}
