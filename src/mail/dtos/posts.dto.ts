import {IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {OrderByEnum, PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {Transform} from "class-transformer";


export class EmailDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    text: string;

}
