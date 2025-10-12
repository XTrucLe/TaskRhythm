import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import {
  CreateTaskDto,
  CreateTaskWithSubTasksDto,
} from "../dto/task/create-task.dto";
import { UpdateTaskDto } from "../dto/task/update-task.dto";
import { TaskStatus } from "../constants/task.constant";
import { TaskQueryService } from "./task-query.service";
import { ProjectService } from "src/modules/project/services/project.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EmitterEvent } from "src/common/constants/emitter.constant";
import { TaskDependencyService } from "./task-dependency.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskQuery: TaskQueryService,
    private readonly taskDependency: TaskDependencyService,
    private readonly projectService: ProjectService,
    private readonly emitter: EventEmitter2
  ) {}

  async createTask(
    projectId: string,
    currentUserId: string,
    createDto: CreateTaskDto
  ): Promise<Task> {
    await this.ensureCreatable(projectId, createDto);

    const { dependencies, ...dto } = createDto;

    const project = await this.projectService.getProjectById(projectId);
    const level = await this.computeLevel(projectId, dto.parentTaskId);

    const task = this.taskRepository.create({
      ...dto,
      project,
      projectId,
      creator: { id: currentUserId },
      parentTask: dto.parentTaskId ? { id: dto.parentTaskId } : undefined,
      level,
    });

    const saved = await this.taskRepository.save(task);

    this.emitter.emit(EmitterEvent.TASK_CREATED, {
      projectId,
      taskId: saved.id,
    });

    if (dependencies) {
      await this.taskDependency.addDependency(
        projectId,
        saved.id,
        dependencies,
        this.taskRepository.manager
      );
    }

    return saved;
  }

  async createMilestone(
    projectId: string,
    currentUserId: string,
    dto: CreateTaskWithSubTasksDto
  ): Promise<Task> {
    const milestone = await this.createTask(projectId, currentUserId, {
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      isMilestone: true,
    });

    if (dto.subTasks?.length) {
      for (const subDto of dto.subTasks) {
        await this.createTask(projectId, currentUserId, {
          ...subDto,
          parentTaskId: milestone.id,
        });
      }
    }

    return milestone;
  }

  async createSubtask(
    projectId: string,
    currentUserId: string,
    parentId: string,
    dto: CreateTaskDto
  ): Promise<Task> {
    await this.taskQuery.getTaskById(projectId, parentId);
    return this.createTask(projectId, currentUserId, {
      ...dto,
      parentTaskId: parentId,
    });
  }

  async update(
    projectId: string,
    taskId: string,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.taskQuery.getTaskById(projectId, taskId);
    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async updateStatus(
    projectId: string,
    taskId: string,
    status: TaskStatus
  ): Promise<Task> {
    const task = await this.taskQuery.getTaskById(projectId, taskId);
    if (task.subTasks?.length) {
      throw new ConflictException(
        "Cannot update status of a task with sub-tasks"
      );
    }
    task.status = status;
    return this.taskRepository.save(task);
  }

  async delete(projectId: string, taskId: string): Promise<void> {
    const task = await this.taskQuery.getTaskById(projectId, taskId);
    await this.taskRepository.remove(task);
    this.emitter.emit(EmitterEvent.TASK_DELETED, { projectId, taskId });
  }

  async toggleBlock(
    projectId: string,
    taskId: string,
    action: "block" | "unblock"
  ): Promise<Task> {
    const task = await this.taskQuery.getTaskById(projectId, taskId);
    task.isBlocked = action === "block";
    return this.taskRepository.save(task);
  }

  private async ensureCreatable(
    projectId: string,
    dto: CreateTaskDto
  ): Promise<void> {
    const titleExists = await this.taskRepository.exists({
      where: { projectId, title: dto.title },
    });
    if (titleExists)
      throw new ConflictException("A task with this title already exists");

    if (dto.parentTaskId) {
      const parentExists = await this.taskRepository.exists({
        where: { id: dto.parentTaskId, projectId },
      });
      if (!parentExists) throw new NotFoundException("Parent task not found");
    }
  }

  private async computeLevel(
    projectId: string,
    parentTaskId?: string
  ): Promise<number> {
    if (!parentTaskId) return 0;

    const parent = await this.taskRepository.findOne({
      where: { id: parentTaskId, projectId },
      select: ["level"],
    });

    return parent ? parent.level + 1 : 0;
  }
}
