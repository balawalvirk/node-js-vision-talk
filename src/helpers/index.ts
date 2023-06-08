import { IQuery } from 'src/types';
export * from './services/base.service';
export * from './decorators/match.decorator';
export * from './decorators/user.decorator';
export * from './pipes/objectId.pipe';
export * from './interceptors/transform.interceptor';
export * from './decorators/role.decorator';
export * from './dtos/pagination.dto';

export const makeQuery = (q: IQuery) => {
  let page = parseInt(q.page) || 1;
  const limit = parseInt(q.limit) || 10;
  if (page === 0) page = 1;
  return {
    limit: limit,
    skip: (page - 1) * limit,
    page: page,
    query: q.query || '',
    sort: { createdAt: -1 },
  };
};
