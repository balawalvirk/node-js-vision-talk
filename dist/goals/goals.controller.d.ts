/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserDocument } from 'src/users/user.schema';
import { UpdateGoalDto } from './dto/update-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(createGoalDto: CreateGoalDto, user: UserDocument): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    findAll(user: UserDocument): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    update(id: string, updateGoalDto: UpdateGoalDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("./goal.schema").Goal> & Omit<import("./goal.schema").Goal & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
}
