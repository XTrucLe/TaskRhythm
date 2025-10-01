import { plainToInstance } from "class-transformer";
import { Task } from "../entities/task.entity";
import { TaskResponseDto } from "../dto/task-response.dto";

export class TaskMapper {
  toDto(entity: Task): TaskResponseDto {
    return plainToInstance(TaskResponseDto, entity);
  }

  toDtos(entities: Task[]): TaskResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
