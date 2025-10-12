import { plainToInstance } from "class-transformer";
import { Task } from "../entities/task.entity";
import {
  TaskResponseDto,
  TaskResponseWithChildDto,
} from "../dto/task/task-response.dto";

export class TaskMapper {
  toDto(entity: Task): TaskResponseDto {
    return plainToInstance(TaskResponseDto, entity);
  }

  toDtos(entities: Task[]): TaskResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }

  toDtoWithChildren(entity: Task): TaskResponseWithChildDto {
    return plainToInstance(TaskResponseWithChildDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  toDtosWithChildren(entities: Task[]): TaskResponseWithChildDto[] {
    return entities.map((entity) => this.toDtoWithChildren(entity));
  }
}
