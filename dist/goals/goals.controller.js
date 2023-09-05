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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsController = void 0;
const common_1 = require("@nestjs/common");
const goals_service_1 = require("./goals.service");
const create_goal_dto_1 = require("./dto/create-goal.dto");
const helpers_1 = require("../helpers");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_goal_dto_1 = require("./dto/update-goal.dto");
let GoalsController = exports.GoalsController = class GoalsController {
    constructor(goalsService) {
        this.goalsService = goalsService;
    }
    async create(createGoalDto, user) {
        return await this.goalsService.createRecord(Object.assign(Object.assign({}, createGoalDto), { user: user._id }));
    }
    async findAll(user) {
        return await this.goalsService.findAllRecords({ user: user._id });
    }
    async update(id, updateGoalDto) {
        return await this.goalsService.findOneRecordAndUpdate({ _id: id }, updateGoalDto);
    }
    async delete(id) {
        return await this.goalsService.deleteSingleRecord({ _id: id });
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, helpers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_goal_dto_1.CreateGoalDto, Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find-all'),
    __param(0, (0, helpers_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Param)('id', helpers_1.ParseObjectId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_goal_dto_1.UpdateGoalDto]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id', helpers_1.ParseObjectId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "delete", null);
exports.GoalsController = GoalsController = __decorate([
    (0, common_1.Controller)('goals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [goals_service_1.GoalsService])
], GoalsController);
//# sourceMappingURL=goals.controller.js.map