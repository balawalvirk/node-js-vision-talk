import { Model } from 'mongoose';
import { BaseService } from 'src/helpers/services/base.service';
import { GoalDocument } from './goal.schema';
export declare class GoalsService extends BaseService<GoalDocument> {
    private goalModal;
    constructor(goalModal: Model<GoalDocument>);
}
