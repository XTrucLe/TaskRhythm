import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsInt,
} from "class-validator";
import { MilestoneStatus } from "../../constants/milestone.constant";

export class CreateMilestoneDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(MilestoneStatus)
  status?: MilestoneStatus;

  @IsOptional()
  @IsInt()
  order?: number;
}
