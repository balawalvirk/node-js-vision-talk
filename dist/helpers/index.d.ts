import { IQuery } from 'src/types';
export * from './services/base.service';
export * from './decorators/match.decorator';
export * from './decorators/user.decorator';
export * from './pipes/objectId.pipe';
export * from './interceptors/transform.interceptor';
export * from './decorators/role.decorator';
export * from './dtos/pagination.dto';
export declare const makeQuery: (q: IQuery) => {
    limit: number;
    skip: number;
    page: number;
    query: string;
    sort: {
        createdAt: number;
    };
};
