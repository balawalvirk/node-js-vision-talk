"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalSchema = exports.Goal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../users/user.schema");
let SupportingGoal = class SupportingGoal {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SupportingGoal.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], SupportingGoal.prototype, "completionDate", void 0);
SupportingGoal = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, _id: false })
], SupportingGoal);
const supportingGoalSchema = mongoose_1.SchemaFactory.createForClass(SupportingGoal);
let Goal = exports.Goal = class Goal {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "importance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Goal.prototype, "completionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "achievedFeeling", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [String] }),
    __metadata("design:type", Array)
], Goal.prototype, "accomplishingCharacteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [String] }),
    __metadata("design:type", Array)
], Goal.prototype, "accomplishingRelationships", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [String] }),
    __metadata("design:type", Array)
], Goal.prototype, "accomplishingCharacteristicsNeeded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [String] }),
    __metadata("design:type", Array)
], Goal.prototype, "accomplishingRelationshipsNeeded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [supportingGoalSchema] }),
    __metadata("design:type", Array)
], Goal.prototype, "supportingGoals", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goal.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Goal.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Goal.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Goal.prototype, "isGoalPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Goal.prototype, "GoalDetails", void 0);
exports.Goal = Goal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Goal);
exports.GoalSchema = mongoose_1.SchemaFactory.createForClass(Goal);
//# sourceMappingURL=goal.schema.js.map