import { IsString, IsOptional, IsEnum, IsUUID } from "class-validator";
import { TaskPriority, TaskStatus } from "../constants/task.constant";

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsUUID()
  parentTaskId?: string;

  @IsOptional()
  progress?: number;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  dueDate?: Date;
}
