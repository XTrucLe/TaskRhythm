import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";

@Injectable()
export class TaskUtilsService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async exists(
    workspace_id: string,
    criteria: { id?: string; title?: string }
  ): Promise<boolean> {
    return await this.taskRepository.exists({
      where: { workspace_id, ...criteria },
    });
  }

  async ensureExists(
    workspaceId: string,
    criteria: { id?: string; title?: string },
    entityName = "Task"
  ): Promise<void> {
    const exists = await this.exists(workspaceId, criteria);
    if (!exists) {
      throw new NotFoundException(
        `${entityName} with criteria ${JSON.stringify(
          criteria
        )} does not exist in workspace ${workspaceId}`
      );
    }
  }

  async ensureNameUnique(workspaceId: string, title: string): Promise<void> {
    const exists = await this.exists(workspaceId, { title });
    if (exists) {
      throw new ConflictException(
        `Task with title "${title}" already exists in workspace ${workspaceId}`
      );
    }
  }

  async ensureParentTaskExists(
    workspaceId: string,
    parentTaskId: string
  ): Promise<void> {
    await this.ensureExists(workspaceId, { id: parentTaskId }, "Parent Task");
  }

  async getLevel(taskId: string): Promise<number> {
    const result = await this.taskRepository
      .createQueryBuilder("task")
      .where("task.id = :taskId", { taskId })
      .select("task.level", "level")
      .getRawOne();

    if (!result) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    const level = Number(result.level);
    if (level === 4) {
      throw new ConflictException(
        "Cannot create sub-task. Maximum depth of 4 levels reached."
      );
    }

    return level;
  }
}
