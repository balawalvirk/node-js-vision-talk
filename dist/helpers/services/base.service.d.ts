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
/// <reference types="mongoose/types/inferschematype" />
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
export declare class BaseService<T> {
    private model;
    constructor(model: Model<T>);
    createRecord: (data: T | {}) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>>;
    insertManyRecords: (data: T | {}) => Promise<import("mongoose").IfAny<import("mongoose").MergeType<import("mongoose").MergeType<T, {} | T>, import("mongoose").Require_id<T>>, any, import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("mongoose").MergeType<T, {} | T>, import("mongoose").Require_id<T>>> & Omit<import("mongoose").Require_id<import("mongoose").MergeType<import("mongoose").MergeType<T, {} | T>, import("mongoose").Require_id<T>>>, never>>[]>;
    findAllRecords: (filter?: FilterQuery<T>, options?: QueryOptions<T>) => import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>[], import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "find">;
    findOneRecord: (filter?: FilterQuery<T>) => import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "findOne">;
    countRecords: (filter: FilterQuery<T>) => import("mongoose").Query<number, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "countDocuments">;
    findRecordById: (id: string) => import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "findOne">;
    deleteSingleRecord: (filter: FilterQuery<T>) => import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "findOneAndDelete">;
    deleteManyRecord: (filter?: FilterQuery<T>) => import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "deleteMany">;
    findOneRecordAndUpdate: (filter: FilterQuery<T>, update: UpdateQuery<T>) => import("mongoose").Query<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "findOneAndUpdate">;
    updateManyRecords: (filter?: FilterQuery<T>, update?: UpdateQuery<T>) => import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}, T, "updateMany">;
}
