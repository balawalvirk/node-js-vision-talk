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
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, keyof Paths> & Paths;
        $clone: () => import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        $getAllSubdocs: () => import("mongoose").Document<any, any, any>[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document<any, any, any>[];
        $inc: (path: string | string[], val?: number) => import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Omit<Required<{
            _id: unknown;
        }>, never>, any>>(name: string) => ModelType;
        $op: "remove" | "save" | "validate";
        $session: (session?: import("mongodb").ClientSession) => import("mongodb").ClientSession;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>;
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>;
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>;
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions<unknown>) => Promise<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>>;
        depopulate: (path?: string | string[]) => import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        directModifiedPaths: () => string[];
        equals: (doc: import("mongoose").Document<unknown, any, any>) => boolean;
        errors?: import("mongoose").Error.ValidationError;
        get: (path: string, type?: any, options?: any) => any;
        getChanges: () => import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>>;
        id?: any;
        increment: () => import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        invalidate: (path: string, errorMsg: string | NativeError, value?: any, kind?: string) => NativeError;
        isDirectModified: (path: string | string[]) => boolean;
        isDirectSelected: (path: string) => boolean;
        isInit: (path: string) => boolean;
        isModified: (path?: string | string[]) => boolean;
        isNew: boolean;
        isSelected: (path: string) => boolean;
        markModified: (path: string, scope?: any) => void;
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => string[];
        overwrite: (obj: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
        $parent: () => import("mongoose").Document<any, any, any>;
        populate: {
            <Paths_1 = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>, Paths_1>>;
            <Paths_2 = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any, {}, {}, {}, any, any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>, Paths_2>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, {}, import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, "find">;
        save: (options?: import("mongoose").SaveOptions) => Promise<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>>;
        schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: string]: any;
        }>> & Omit<import("mongoose").FlatRecord<{
            [x: string]: any;
        }> & Required<{
            _id: unknown;
        }>, never>>>;
        set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>;
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>;
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }, never>;
        };
        toJSON: {
            <T = import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Omit<Required<{
                _id: unknown;
            }>, never>> & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T>;
            <T_1 = import("../users/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            }>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Omit<Required<{
                _id: unknown;
            }>, never>> & {
                flattenMaps: false;
            }): T_1;
        };
        toObject: <T_2 = import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Omit<Required<{
            _id: unknown;
        }>, never>>) => import("mongoose").Require_id<T_2>;
        unmarkModified: (path: string) => void;
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>>, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, {}, import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & Omit<import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, "find">;
        validate: {
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): import("mongoose").Error.ValidationError;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
        };
        email: string;
        firstName: string;
        lastName: string;
        authType: string;
        birthDate: Date;
        avatar: string;
        degree: string;
        phoneNumber: string;
        lifeGoals: import("mongoose").FlattenMaps<{
            physical: string;
            emotional: string;
            intellectual: string;
            relational: string;
            professsional: string;
        }>;
        pointsOfClarity: import("mongoose").FlattenMaps<{
            myValues: string;
            myWhy: string;
            myMission: string;
        }>;
        focusList: import("mongoose").FlattenMaps<{
            desire: string;
            affirmation1: string;
            affirmation2: string;
            affirmation3: string;
            affirmation4: string;
            affirmation5: string;
            affirmation6: string;
            affirmation7: string;
            affirmation8: string;
            affirmation9: string;
            affirmation10: string;
        }>;
    }>;
}
export {};
