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
  parent_task_id?: string;

  @IsOptional()
  progress?: number;

  @IsOptional()
  start_date?: Date;

  @IsOptional()
  due_date?: Date;
}
