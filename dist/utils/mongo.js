"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticMongooseId = exports.validateMongoId = exports.isMongoIdValid = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const isMongoIdValid = (id) => {
    const isValid = mongoose_1.Types.ObjectId.isValid(id);
    return isValid;
};
exports.isMongoIdValid = isMongoIdValid;
const validateMongoId = ({ value, key }) => {
    if (!value || mongoose_1.Types.ObjectId.isValid(value)) {
        return value;
    }
    else {
        throw new common_1.BadRequestException(`${key} is not a valid MongoId`);
    }
};
exports.validateMongoId = validateMongoId;
const getStaticMongooseId = () => {
    return new mongoose_1.default.Types.ObjectId();
};
exports.getStaticMongooseId = getStaticMongooseId;
//# sourceMappingURL=mongo.js.map