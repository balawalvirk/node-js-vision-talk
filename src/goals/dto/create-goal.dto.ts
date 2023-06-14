import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsString, ValidateNested } from 'class-validator';

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

  @IsString()
  accomplishingCharacteristics: string[];

  @IsString()
  accomplishingRelationships: string[];

  @IsString()
  accomplishingCharacteristicsNeeded: string[];

  @IsString()
  accomplishingRelationshipsNeeded: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupportingGoal)
  supportingGoals?: SupportingGoal[];

  @IsString()
  image: string;
}
