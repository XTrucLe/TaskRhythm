import { plainToInstance } from "class-transformer";
import { Task } from "../entities/task.entity";
import { TaskResponseDto } from "../dto/task/task-response.dto";

export class TaskMapper {
  toDto(entity: Task): TaskResponseDto {
    return plainToInstance(TaskResponseDto, entity);
  }

  toDtos(entities: Task[]): TaskResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }

  toDtosTree(
    entities: Task[]
  ): (TaskResponseDto & { children?: TaskResponseDto[] })[] {
    const entityMap: Record<
      string,
      TaskResponseDto & { children?: TaskResponseDto[] }
    > = {};
    const roots: (TaskResponseDto & { children?: TaskResponseDto[] })[] = [];

    // First, create a map of all entities
    entities.forEach((entity) => {
      const dto = this.toDto(entity) as TaskResponseDto & {
        children?: TaskResponseDto[];
      };
      entityMap[entity.id] = dto;
    });
    // Then, build the tree structure
    entities.forEach((entity) => {
      const dto = entityMap[entity.id];
      if (entity.parentId) {
        const parent = entityMap[entity.parentId];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(dto);
      } else {
        roots.push(dto);
      }
    });

    return roots;
  }
}
