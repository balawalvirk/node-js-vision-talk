"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let TransformInterceptor = exports.TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (!data) {
                throw new common_1.HttpException('Record does not exists.', common_1.HttpStatus.BAD_REQUEST);
            }
            else if (data.message && !data.data) {
                if (typeof data.message === 'string')
                    return { statusCode: 200, message: data.message };
                else
                    return { data, statusCode: 200 };
            }
            else if (data.message && data.data) {
                return { data: data.data, statusCode: 200, message: data.message };
            }
            else {
                return { data, statusCode: 200 };
            }
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map