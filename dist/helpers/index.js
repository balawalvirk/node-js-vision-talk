"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQuery = void 0;
__exportStar(require("./services/base.service"), exports);
__exportStar(require("./decorators/match.decorator"), exports);
__exportStar(require("./decorators/user.decorator"), exports);
__exportStar(require("./pipes/objectId.pipe"), exports);
__exportStar(require("./interceptors/transform.interceptor"), exports);
__exportStar(require("./decorators/role.decorator"), exports);
__exportStar(require("./dtos/pagination.dto"), exports);
const makeQuery = (q) => {
    let page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    if (page === 0)
        page = 1;
    return {
        limit: limit,
        skip: (page - 1) * limit,
        page: page,
        query: q.query || '',
        sort: { createdAt: -1 },
    };
};
exports.makeQuery = makeQuery;
//# sourceMappingURL=index.js.map