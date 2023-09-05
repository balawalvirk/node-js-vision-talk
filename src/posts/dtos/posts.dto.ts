import {IsEnum, IsNotEmpty, IsString, IsUUID} from 'class-validator';
import {PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";

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
