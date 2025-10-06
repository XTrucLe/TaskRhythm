import { Type } from "class-transformer";
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from "class-validator";
import { TaskPriority, TaskStatus } from "../constants/task.constant";

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  assign_id?: string;

  @IsOptional()
  @IsString()
  parent_task_id?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDateFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDateTo?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAtFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAtTo?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAtFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAtTo?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number = 20;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  sortOrder: "ASC" | "DESC" = "ASC";
}
