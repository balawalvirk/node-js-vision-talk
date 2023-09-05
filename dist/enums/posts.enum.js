"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderByEnum = exports.PostTypeEnum = exports.PostCategoryEnum = void 0;
var PostCategoryEnum;
(function (PostCategoryEnum) {
    PostCategoryEnum["FINANCIAL"] = "financial";
    PostCategoryEnum["PHYSICAL"] = "physical";
    PostCategoryEnum["RELATIONAL"] = "relational";
    PostCategoryEnum["INTELLECTUAL"] = "intellectual";
    PostCategoryEnum["EMOTIONAL"] = "emotional";
    PostCategoryEnum["PROFESSIONAL"] = "professional";
    PostCategoryEnum["DEFAULT"] = "default";
})(PostCategoryEnum || (exports.PostCategoryEnum = PostCategoryEnum = {}));
var PostTypeEnum;
(function (PostTypeEnum) {
    PostTypeEnum["POST"] = "post";
    PostTypeEnum["VISION"] = "vision";
    PostTypeEnum["DEFAULT"] = "default";
})(PostTypeEnum || (exports.PostTypeEnum = PostTypeEnum = {}));
var OrderByEnum;
(function (OrderByEnum) {
    OrderByEnum["ASCENDING"] = "ascending";
    OrderByEnum["DESCENDING"] = "descending";
    OrderByEnum["DEFAULT"] = "default";
})(OrderByEnum || (exports.OrderByEnum = OrderByEnum = {}));
//# sourceMappingURL=posts.enum.js.map