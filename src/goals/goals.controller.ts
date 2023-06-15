import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CurrentUser, ParseObjectId } from 'src/helpers';
import { UserDocument } from 'src/users/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post('create')
  async create(@Body() createGoalDto: CreateGoalDto, @CurrentUser() user: UserDocument) {
    return await this.goalsService.createRecord({ ...createGoalDto, user: user._id });
  }

  @Get('find-all')
  async findAll(@CurrentUser() user: UserDocument) {
    return await this.goalsService.findAllRecords({ user: user._id });
  }

  @Put(':id/update')
  async update(@Param('id', ParseObjectId) id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return await this.goalsService.findOneRecordAndUpdate({ _id: id }, updateGoalDto);
  }

  @Delete(':id/delete')
  async delete(@Param('id', ParseObjectId) id: string) {
    return await this.goalsService.deleteSingleRecord({ _id: id });
  }
}
