import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {PostDocument} from "src/posts/models/posts.model";
import {
    CreatePostComment,
    CreatePostDto,
    CreatePostFilterDto,
    SavePostDto,
    UpdatePostDto
} from "src/posts/dtos/posts.dto";
import {errorResponse, successResponse} from "src/utils/response";
import {sendEmail} from "src/utils/email";
import {EmailDto} from "src/mail/dtos/posts.dto";

@Injectable()
export class EmailService {
    constructor(

    ) {
    }

    async create(payload: EmailDto) {
        sendEmail(process.env.SUPPORT_EMAIL,payload.email,"Mariza Support","",
            payload.text)
        return successResponse(200, 'email sended', {});
    }

}
