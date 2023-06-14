import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { Goal } from './entities/goal.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalSchema } from './goal.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }])],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
