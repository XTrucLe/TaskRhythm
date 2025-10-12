import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";

import { TaskDependency } from "../entities/task-dependency.entity";
import { TaskQueryService } from "./task-query.service";
import {
  CreateDependencyDto,
  CreateTaskDependencyDto,
} from "../dto/task-dependence/create-task-dependency.dto";
import { TaskDependencyType, TaskDirection } from "../constants/task.constant";
import { EmitterEvent } from "src/common/constants/emitter.constant";

@Injectable()
export class TaskDependencyService {
  constructor(
    @InjectRepository(TaskDependency)
    private readonly dependencyRepo: Repository<TaskDependency>,
    private readonly taskQuery: TaskQueryService,
    private readonly emitter: EventEmitter2
  ) {}

  async addDependency(
    projectId: string,
    taskId: string,
    dto: CreateDependencyDto,
    manager?: EntityManager
  ): Promise<TaskDependency> {
    if (taskId === dto.taskId) {
      throw new BadRequestException("A task cannot depend on itself");
    }

    const repo = this.getRepo(manager);
    await this.ensureDependencyNotExists(taskId, dto.taskId, manager);

    const [dependentId, prerequisiteId] =
      dto.direction === TaskDirection.BLOCKED_BY
        ? [taskId, dto.taskId] // current task bị chặn bởi task kia
        : [dto.taskId, taskId]; // current task chặn task kia

    const dependency = repo.create({
      task: { id: dependentId },
      dependsOnTask: { id: prerequisiteId },
      type: dto.type ?? TaskDependencyType.FINISH_TO_START,
    });

    const saved = await repo.save(dependency);

    this.emitter.emit(EmitterEvent.TASK_DEPENDENCY_ADDED, {
      projectId,
      taskId: dependentId,
      dependsOnTaskId: prerequisiteId,
    });

    return saved;
  }

  async createTaskDependency(
    projectId: string,
    dto: CreateTaskDependencyDto
  ): Promise<TaskDependency> {
    return this.addDependency(projectId, dto.taskId, {
      taskId: dto.dependsOnTaskId,
      direction: dto.direction,
    });
  }

  async removeDependency(
    projectId: string,
    taskId: string,
    dependsOnTaskId: string,
    manager?: EntityManager
  ): Promise<void> {
    const repo = this.getRepo(manager);
    const dependency = await repo.findOne({
      where: { task: { id: taskId }, dependsOnTask: { id: dependsOnTaskId } },
    });

    if (!dependency) {
      throw new NotFoundException("Dependency not found");
    }

    await repo.remove(dependency);

    this.emitter.emit(EmitterEvent.TASK_DEPENDENCY_REMOVED, {
      projectId,
      taskId,
      dependsOnTaskId,
    });
  }

  // --- PRIVATE HELPERS --- //

  private async ensureDependencyNotExists(
    taskId: string,
    dependsOnTaskId: string,
    manager?: EntityManager
  ): Promise<void> {
    const repo = this.getRepo(manager);
    const exists = await repo.exists({
      where: { task: { id: taskId }, dependsOnTask: { id: dependsOnTaskId } },
    });

    if (exists) {
      throw new ConflictException("Dependency already exists");
    }
  }

  private getRepo(manager?: EntityManager): Repository<TaskDependency> {
    return manager?.getRepository(TaskDependency) ?? this.dependencyRepo;
  }
}
