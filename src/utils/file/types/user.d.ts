import mongoose, { Types } from 'mongoose';
import { ROLES } from 'src/common/enums';

declare global {
  namespace Express {
    interface User{
      _id: mongoose.Types.ObjectId;
      fullname?: string;
      email?: string;
      role?: string;
      accessToken?: string;
      hotel?: Types.ObjectId;
      whoMakeIt?: string;
    }
  }
}
