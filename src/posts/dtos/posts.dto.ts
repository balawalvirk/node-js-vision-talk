import {IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {OrderByEnum, PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {Transform} from "class-transformer";

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


    @IsOptional()
    @Transform(({obj, key}) => {
        return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
    })
    @IsBoolean()
    is_created_by_admin;


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


    @IsOptional()
    @IsNumber()
    page;


    @IsOptional()
    @IsArray()
    @IsString({each:true})
    allCategories;


    @IsOptional()
    @IsBoolean()
    is_created_by_admin;

    @IsOptional()
    @IsNumber()
    perPage;

}



export class SavePostDto {

    @IsString()
    @IsNotEmpty()
    post;


}




export class UpdatePostDto {

    @IsString()
    @IsOptional()
    caption;



    @IsEnum(PostCategoryEnum)
    @IsOptional()
    category;

    @IsEnum(PostTypeEnum)
    @IsOptional()
    type;

    @IsOptional()
    @Transform(({obj, key}) => {
        return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
    })
    @IsBoolean()
    is_created_by_admin;

}
