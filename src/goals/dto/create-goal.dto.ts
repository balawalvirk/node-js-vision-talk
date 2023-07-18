import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator';

class SupportingGoal {
  @IsString()
  name: string;

  @IsDateString()
  completionDate: Date;
}

export class CreateGoalDto {
  @IsString()
  name: string;

  @IsString()
  importance: string;

  @IsDateString()
  completionDate: Date;

  @IsString()
  type: string;

  @IsString()
  achievedFeeling: string;

  @IsString({ each: true })
  accomplishingCharacteristics: string[];

  @IsString({ each: true })
  accomplishingRelationships: string[];

  @IsString({ each: true })
  accomplishingCharacteristicsNeeded: string[];

  @IsString({ each: true })
  accomplishingRelationshipsNeeded: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupportingGoal)
  supportingGoals: SupportingGoal[];

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsBoolean()
  isGoalPublic?: boolean;

  @IsOptional()
  @IsString()
  GoalDetails?: string;
}
