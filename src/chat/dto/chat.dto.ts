import {ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {OrderByEnum, PostCategoryEnum, PostTypeEnum} from "src/enums/posts.enum";
import {ChatMessageTypeEnum} from "src/enums/chat.enum";
import {Transform} from "class-transformer";

export class CreateChatDto {

    @IsString()
    @IsNotEmpty()
    sessionId;


    @IsNotEmpty()
    @IsString()
    message;

    @IsEnum(ChatMessageTypeEnum)
    @IsString()
    type;

}


export class CreateGroupMessageDto {

    @IsString()
    @IsNotEmpty()
    groupId;


    @IsNotEmpty()
    @IsString()
    message;

    @IsEnum(ChatMessageTypeEnum)
    @IsString()
    type;

}


export class CreateSessionDto {

    @IsString()
    @IsNotEmpty()
    contact;

}

export class CreateGroupDto {
    @Transform(({value}) => JSON.parse(value))
    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    users: string[];

    @IsString()
    @IsNotEmpty()
    name;


}

