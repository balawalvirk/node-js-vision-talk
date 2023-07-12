import { Type } from 'class-transformer';
import { IsString, IsDateString, IsOptional, IsNumber, ValidateNested } from 'class-validator';

class PointsOfClarity {
  @IsString()
  myValues: string;

  @IsString()
  myWhy: string;

  @IsString()
  myMission: string;
}

class LifeGoals {
  @IsString()
  physical: string;

  @IsString()
  emotional: string;

  @IsString()
  intellectual: string;

  @IsString()
  relational: string;

  @IsString()
  professsional: string;
}

class FocusList {
  @IsString()
  desire: string;

  @IsString()
  affirmation1: string;

  @IsString()
  affirmation2: string;

  @IsString()
  affirmation3: string;

  @IsString()
  affirmation4: string;

  @IsString()
  affirmation5: string;

  @IsString()
  affirmation6: string;

  @IsString()
  affirmation7: string;

  @IsString()
  affirmation8: string;

  @IsString()
  affirmation9: string;

  @IsString()
  affirmation10: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsNumber()
  PhoneNumber?: number;

  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PointsOfClarity)
  pointsOfClarity?: PointsOfClarity;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LifeGoals)
  lifeGoals?: LifeGoals;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FocusList)
  focusList?: FocusList;
}
