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
    projectId: string,
    criteria: { id?: string; title?: string }
  ): Promise<boolean> {
    return await this.taskRepository.exists({
      where: { projectId, ...criteria },
    });
  }

  async ensureExists(
    projectId: string,
    criteria: { id?: string; title?: string },
    entityName = "Task"
  ): Promise<void> {
    const exists = await this.exists(projectId, criteria);
    if (!exists) {
      throw new NotFoundException(
        `${entityName} with criteria ${JSON.stringify(
          criteria
        )} does not exist in project ${projectId}`
      );
    }
  }

  async ensureNameUnique(projectId: string, title: string): Promise<void> {
    const exists = await this.exists(projectId, { title });
    if (exists) {
      throw new ConflictException(
        `Task with title "${title}" already exists in project ${projectId}`
      );
    }
  }

  async ensureParentTaskExists(
    projectId: string,
    parentTaskId: string
  ): Promise<void> {
    await this.ensureExists(projectId, { id: parentTaskId }, "Parent Task");
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
    if (level >= 3) {
      throw new ConflictException(
        "Cannot create sub-task. Maximum depth of 3 levels reached."
      );
    }

    return level;
  }
}
