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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("../types");
const mongoose = require("mongoose");
let LifeGoals = class LifeGoals {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LifeGoals.prototype, "physical", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LifeGoals.prototype, "emotional", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LifeGoals.prototype, "intellectual", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LifeGoals.prototype, "relational", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LifeGoals.prototype, "professsional", void 0);
LifeGoals = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, _id: false })
], LifeGoals);
const lifeGoalsSchema = mongoose_1.SchemaFactory.createForClass(LifeGoals);
let PointsOfClarity = class PointsOfClarity {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PointsOfClarity.prototype, "myValues", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PointsOfClarity.prototype, "myWhy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PointsOfClarity.prototype, "myMission", void 0);
PointsOfClarity = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, _id: false })
], PointsOfClarity);
const PointsOfClaritySchema = mongoose_1.SchemaFactory.createForClass(PointsOfClarity);
let FocusList = class FocusList {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "desire", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation3", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation4", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation5", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation6", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation7", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation8", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation9", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FocusList.prototype, "affirmation10", void 0);
FocusList = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, _id: false })
], FocusList);
const FocusListSchema = mongoose_1.SchemaFactory.createForClass(FocusList);
let User = exports.User = User_1 = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: types_1.AuthTypes.LOCAL }),
    __metadata("design:type", String)
], User.prototype, "authType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "degree", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: lifeGoalsSchema }),
    __metadata("design:type", LifeGoals)
], User.prototype, "lifeGoals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: PointsOfClaritySchema }),
    __metadata("design:type", PointsOfClarity)
], User.prototype, "pointsOfClarity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: FocusListSchema }),
    __metadata("design:type", FocusList)
], User.prototype, "focusList", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            type: mongoose.Schema.Types.ObjectId,
            ref: User_1.name
        }]),
    __metadata("design:type", Object)
], User.prototype, "followers", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            type: mongoose.Schema.Types.ObjectId,
            ref: User_1.name
        }]),
    __metadata("design:type", Object)
], User.prototype, "followings", void 0);
exports.User = User = User_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map