import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDocument } from 'src/users/user.schema';
import { RegisterDto } from './dtos/register.dto';
import { hash } from 'bcrypt';
import { CurrentUser } from 'src/helpers';
import { OtpDocument } from './otp.schema';
import { ResetPasswordDto } from './dtos/reset-pass.dto';
import { EmailService } from 'src/helpers/services/email.service';
import { ForgotPasswordDto } from './dtos/forgot-pass.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService, private readonly emailService: EmailService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument) {
    const { access_token } = await this.authService.login(user);
    return { access_token, user };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const emailExists = await this.userService.findOneRecord({ email: registerDto.email });
    if (emailExists) throw new BadRequestException('User already exists with this email.');
    const user = await this.userService.createRecord({ ...registerDto, password: await hash(registerDto.password, 10) });
    const { access_token } = await this.authService.login(user);
    return { access_token, user };
  }

  @Post('forget-password')
  async forgetPassword(@Body() { email }: ForgotPasswordDto) {
    const user = await this.userService.findOneRecord({ email });
    if (!user) throw new BadRequestException('Email does not exists.');
    const otp: OtpDocument = await this.authService.createOtp({
      otp: Math.floor(Math.random() * 10000 + 1),
      expireIn: new Date().getTime() + 300 * 1000,
      email,
    });
    const mail = {
      to: email,
      subject: 'Change Password request',
      from: 'awaismehr001@gmail.com',
      text: 'Hello World from NestJS Sendgrid',
      html: `<h1>password reset otp</h1> <br/> ${otp.otp} </br> This otp will expires in 5 minuutes`,
    };
    await this.emailService.send(mail);
    return { message: 'Otp sent to your email.' };
  }

  @Post('reset-password')
  async resetPassword(@Body() { password, otp }: ResetPasswordDto) {
    const otpFound: OtpDocument = await this.authService.findOneOtp({ otp });
    if (!otpFound) throw new BadRequestException('Invalid Otp.');
    const diff = otpFound.expireIn - new Date().getTime();
    if (diff < 0) throw new BadRequestException('Otp expired.');
    await this.userService.findOneRecordAndUpdate({ email: otpFound.email }, { password: await hash(password, 10) });
    return { message: 'Password changed successfully.' };
  }
}
