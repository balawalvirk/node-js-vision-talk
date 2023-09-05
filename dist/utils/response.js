"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const common_1 = require("@nestjs/common");
const successResponse = (statusCode, message, data) => {
    return {
        success: true,
        statusCode,
        message,
        data: JSON.parse(JSON.stringify(data)),
    };
};
exports.successResponse = successResponse;
const errorResponse = (statusCode, message) => {
    if (statusCode === 400) {
        throw new common_1.BadRequestException(message);
    }
    else if (statusCode === 404) {
        throw new common_1.NotFoundException(message);
    }
    else if (statusCode === 409) {
        throw new common_1.HttpException(message, common_1.HttpStatus.CONFLICT);
    }
    else {
        throw new common_1.InternalServerErrorException(message);
    }
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map