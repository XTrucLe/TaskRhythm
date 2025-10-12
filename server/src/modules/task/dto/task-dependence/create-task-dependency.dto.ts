import { IsEnum, IsOptional, IsUUID } from "class-validator";
import {
  TaskDependencyType,
  TaskDirection,
} from "../../constants/task.constant";

export class CreateDependencyDto {
  @IsUUID()
  taskId!: string;

  @IsEnum(TaskDirection)
  direction!: TaskDirection;

  @IsOptional()
  @IsEnum(TaskDependencyType)
  type?: TaskDependencyType;
}

export class CreateTaskDependencyDto extends CreateDependencyDto {
  @IsUUID()
  dependsOnTaskId!: string;
}
