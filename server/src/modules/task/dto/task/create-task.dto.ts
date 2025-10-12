import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsDate,
  IsBoolean,
  IsInt,
  ValidateNested,
} from "class-validator";
import { TaskPriority, TaskStatus } from "../../constants/task.constant";
import { CreateDependencyDto } from "../task-dependence/create-task-dependency.dto";

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
  @IsInt()
  progress?: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsBoolean()
  isMilestone?: boolean;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @ValidateNested()
  dependencies?: CreateDependencyDto;
}

export class CreateTaskWithSubTasksDto extends CreateTaskDto {
  @IsOptional()
  subTasks?: CreateTaskDto[];
}
