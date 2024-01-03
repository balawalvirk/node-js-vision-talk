import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {OrderByEnum, PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {NewsLetterSubscriptionRequestsType} from "src/enums/newsletter.enum";



export class CreateNewsLetterDto {

    @IsString()
    @IsNotEmpty()
    title;

}


export class UpdateNewsLetterDto {

    @IsString()
    @IsOptional()
    title;

    @IsString()
    @IsNotEmpty()
    details;



    @IsString()
    @IsNotEmpty()
    time;

}

export class CreateArticleDto {

    @IsString()
    @IsNotEmpty()
    title;



    @IsString()
    @IsNotEmpty()
    details;



    @IsString()
    @IsNotEmpty()
    time;

}



export class UpdateArticleDto {

    @IsString()
    @IsOptional()
    title;



    @IsString()
    @IsOptional()
    details;



    @IsString()
    @IsOptional()
    time;

}


export class CreateNewsletterComment {

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



export class CreateNewsletterSubscriptionDto {

    @IsString()
    @IsNotEmpty()
    user;


}



export class UpdateNewsletterSubscriptionStatusRequest {

    @IsString()
    @IsEnum(NewsLetterSubscriptionRequestsType)
    request_state;


}



export class SaveArticleDto {

    @IsString()
    @IsNotEmpty()
    article;


}
