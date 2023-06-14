import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CurrentUser } from 'src/helpers';
import { UserDocument } from 'src/users/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post('create')
  async create(@Body() createGoalDto: CreateGoalDto, @CurrentUser() user: UserDocument) {
    return await this.goalsService.createRecord({ ...createGoalDto, user: user._id });
  }
}
