import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-pass.dto';
import { UserDocument } from './user.schema';
import { compare, hash } from 'bcrypt';
import { CurrentUser } from 'src/helpers';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('change-password')
  async changePassword(@Body() { newPassword, oldPassword }: ChangePasswordDto, @CurrentUser() user: UserDocument) {
    const userFound = await this.usersService.findOneRecord({ _id: user._id });
    const match = await compare(oldPassword, userFound.password);
    if (!match) throw new BadRequestException('Old password is incorrect.');
    await this.usersService.findOneRecordAndUpdate({ _id: user._id }, { password: await hash(newPassword, 10) });
    return 'Password changed successfully.';
  }

  @Put('update')
  async setupProfile(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: UserDocument) {
    return await this.usersService.findOneRecordAndUpdate({ _id: user._id }, updateUserDto);
  }
}
