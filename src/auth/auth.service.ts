import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {AuthTypes, IEnvironmentVariables} from 'src/types';
import { UsersService } from '../users/users.service';
import {User, UserDocument} from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Otp, OtpDocument } from './otp.schema';
import axios from 'axios';
import {errorResponse, successResponse} from "src/utils/response";
import {LoginWithSocialDto} from "src/auth/dtos/login";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IEnvironmentVariables>,
    @InjectModel(Otp.name) private otpModal: Model<OtpDocument>,
    @InjectModel(User.name) private userModal: Model<UserDocument>
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne({ email });
    if (!user) return null;

    if(user.is_deleted)
        return null;

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



    async loginGoogle(payload: LoginWithSocialDto) {
        try{
            const response: any = await axios.get(`${process.env.BASE_URL_GOOGLE_AUTH}${payload.token}`);
            const decoded=response.data;
            if (!decoded.email) {
                return errorResponse(404, 'Invalid token.');

            } else {
                const user: any = await this.userModal.findOne({email: decoded.email});
                if (user) {
                    const payload = {sub: user._id, role: "user"};
                    user._doc.access_token = this.jwtService.sign(payload);
                    return successResponse(200, 'user', user);

                } else {
                    const user: any = await this.userModal.create({email: decoded.email,first_name:decoded.given_name,last_name:decoded.family_name,
                        authType:AuthTypes.GOOGLE});
                    const payload = {sub: user._id, role: "user"};
                    user._doc.access_token = this.jwtService.sign(payload);
                    return successResponse(200, 'user', user);

                }
            }
        }catch (e) {
            return errorResponse(500, e);
        }
    }


    async facebookLogin(payload: LoginWithSocialDto) {

        try{
            const response: any = await axios.get(`${process.env.FACEBOOK_AUTH_URL}access_token=${payload.token}&debug=all&fields=id%2Cname%2Cemail%2Cfirst_name%2Clast_name
            &format=json&method=get&pretty=0&suppress_http_code=1`);

            console.log(`${process.env.FACEBOOK_AUTH_URL}access_token=${payload.token}&debug=all&fields=id%2Cname%2Cemail%2Cfirst_name%2Clast_name&format=json&method=get&pretty=0&suppress_http_code=1`)

            const decoded=response.data;
            if (!decoded.email) {
                return errorResponse(404, 'Invalid token.');

            } else {
                const user: any = await this.userModal.findOne({email: decoded.email});
                if (user) {
                    const payload = {sub: user._id, role: "user"};
                    user._doc.access_token = this.jwtService.sign(payload);
                    return successResponse(200, 'user', user);

                } else {
                    const user: any = await this.userModal.create({email: decoded.email,first_name:decoded.first_name
                        ,last_name:decoded.last_name,
                        authType:AuthTypes.FACEBOOK});
                    const payload = {sub: user._id, role: "user"};
                    user._doc.access_token = this.jwtService.sign(payload);
                    return successResponse(200, 'user', user);

                }
            }
        }catch (e) {
            return errorResponse(500, e);
        }
    }

}
