import {
    Controller,
    Post,
    Body,
    BadRequestException,
    UseGuards,
    Put,
    Request,
    Delete,
    Param,
    Get,
    UseInterceptors, UploadedFile, ParseFilePipe, ValidationPipe
} from '@nestjs/common';
import {UsersService} from './users.service';
import {ChangePasswordDto} from './dto/change-pass.dto';
import {UserDocument} from './user.schema';
import {compare, hash} from 'bcrypt';
import {CurrentUser} from 'src/helpers';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreatePostFilterDto} from "src/posts/dtos/posts.dto";
import {CreateFollowerFollowingDto} from "src/users/dto/user.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import FileUploadToS3 from "src/utils/FileUploadToS3";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('change-password')
    async changePassword(@Body() {newPassword, oldPassword}: ChangePasswordDto, @CurrentUser() user: UserDocument) {
        const userFound = await this.usersService.findOneRecord({_id: user._id});
        const match = await compare(oldPassword, userFound.password);
        if (!match) throw new BadRequestException('Old password is incorrect.');
        await this.usersService.findOneRecordAndUpdate({_id: user._id}, {password: await hash(newPassword, 10)});
        return 'Password changed successfully.';
    }


    @UseInterceptors(FileInterceptor('file',{  storage: FileUploadToS3.uploadFile() }))
    @Put('update')
    async update(@UploadedFile(new ParseFilePipe({fileIsRequired: false})) file: any,
                 @Body(new ValidationPipe({transform: true})) updateUserDto: UpdateUserDto, @CurrentUser() user: UserDocument) {



        return await this.usersService.findOneRecordAndUpdate({_id: user._id}, {...updateUserDto,avatar:file?.location || user.avatar});
    }

    @Post('follower')
    async addFollower(@Body() body: CreateFollowerFollowingDto,@Request() req) {
        return await this.usersService.addFollower(req.user._id, body);
    }

    @Post('following')
    async addFollowing(@Body() body: CreateFollowerFollowingDto,@Request() req) {
        return await this.usersService.addFollowing(req.user._id, body);
    }



    @Delete('follower/:followerId')
    async deleteFollower(@Param('followerId') followerId: string,@Request() req) {
        return await this.usersService.deleteFollower(req.user._id, followerId);
    }


    @Delete('following/:followingId')
    async deleteFollowing(@Param('followingId') followingId: string,@Request() req) {
        return await this.usersService.deleteFollowing(req.user._id, followingId);
    }


    @Get('me')
    async getMe(@Request() req) {
        return await this.usersService.getUserById(req.user._id);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.usersService.getUserById(id);
    }




}
