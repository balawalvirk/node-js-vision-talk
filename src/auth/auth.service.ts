import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IEnvironmentVariables } from 'src/types';
import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Otp, OtpDocument } from './otp.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IEnvironmentVariables>,
    @InjectModel(Otp.name) private otpModal: Model<OtpDocument>,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne({ email });
    if (!user) return null;
    const match = await compare(pass, user.password);
    if (!match) return null;
    const { password, ...result } = user;
    return result;
  }

  async login(user: UserDocument) {
    const payload = { username: `${user.firstName} ${user.lastName}`, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, { secret: this.configService.get('JWT_TOKEN_SECRET') }),
    };
  }

  AddMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }

  async createOtp(body: any) {
    return await this.otpModal.create(body);
  }

  async findOneOtp(filter?: FilterQuery<any>) {
    return await this.otpModal.findOne(filter);
  }
}
