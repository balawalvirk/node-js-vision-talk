import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/helpers/services/base.service';
import { Goal, GoalDocument } from './goal.schema';

@Injectable()
export class GoalsService extends BaseService<GoalDocument> {
  constructor(@InjectModel(Goal.name) private goalModal: Model<GoalDocument>) {
    super(goalModal);
  }
}
