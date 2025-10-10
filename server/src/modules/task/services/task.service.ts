import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Task } from "../entities/task.entity";
import { TaskUtilsService } from "./task-utils.service";
import { TaskStatus } from "../constants/task.constant";
import { TaskQueryDto } from "../dto/task-query.dto";
import { ProjectService } from "src/modules/project/services/project.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskUtils: TaskUtilsService,
    private readonly projectService: ProjectService
  ) {}

  // ----------------------------------------------------------------
  // 🔹 CREATE TASK
  // ----------------------------------------------------------------
  async create(
    projectId: string,
    currentUserId: string,
    dto: CreateTaskDto
  ): Promise<Task> {
    await this.validateBeforeCreate(projectId, dto);

    const project = await this.projectService.getProjectById(projectId);
    const level = dto.parentTaskId
      ? (await this.taskUtils.getLevel(dto.parentTaskId)) + 1
      : 0;

    const task = this.taskRepository.create({
      ...dto,
      projectId,
      project,
      level,
      creatorId: currentUserId,
      parentTask: dto.parentTaskId ? { id: dto.parentTaskId } : undefined,
    });
    return this.taskRepository.save(task);
  }

  async createWithChildren(
    projectId: string,
    currentUserId: string,
    dto: CreateTaskDto & { subTasks?: CreateTaskDto[] }
  ): Promise<Task> {
    await this.validateBeforeCreate(projectId, dto);

    const project = await this.projectService.getProjectById(projectId);
    const level = dto.parentTaskId
      ? (await this.taskUtils.getLevel(dto.parentTaskId)) + 1
      : 0;

    const task = this.taskRepository.create({
      ...dto,
      projectId,
      project,
      level,
      creatorId: currentUserId,
      parentTask: dto.parentTaskId ? { id: dto.parentTaskId } : undefined,
    });

    const savedTask = await this.taskRepository.save(task);

    if (dto.subTasks?.length) {
      const subTasks = await Promise.all(
        dto.subTasks.map((child) =>
          this.createWithChildren(projectId, currentUserId, {
            ...child,
            parentTaskId: savedTask.id,
          })
        )
      );
      savedTask.subTasks = subTasks;
    }

    return savedTask;
  }

  async update(
    projectId: string,
    taskId: string,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.findTaskById(projectId, taskId);

    if (dto.title && dto.title !== task.title) {
      await this.taskUtils.ensureNameUnique(projectId, dto.title);
    }

    if (dto.parentTaskId) {
      await this.taskUtils.ensureParentTaskExists(projectId, dto.parentTaskId);
    }

    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async updateStatus(
    projectId: string,
    taskId: string,
    status: TaskStatus
  ): Promise<Task> {
    const task = await this.findTaskById(projectId, taskId);

    if (task.subTasks?.length) {
      throw new ConflictException(
        "Cannot update status of a task with sub-tasks. Update sub-tasks first."
      );
    }

    task.status = status;
    return this.taskRepository.save(task);
  }

  async delete(projectId: string, taskId: string): Promise<void> {
    const task = await this.findTaskById(projectId, taskId);
    await this.taskRepository.remove(task);
  }

  async findTaskById(projectId: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, projectId },
      relations: ["subTasks"],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async getTaskByParentId(
    projectId: string,
    parentTaskId: string
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: { projectId, parentTask: { id: parentTaskId } },
    });
  }

  async list(projectId: string, query: TaskQueryDto): Promise<Task[]> {
    const {
      parentTaskId,
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      sortOrder = "ASC",
      ...filters
    } = query;

    const where: any = { projectId, ...filters };

    if (parentTaskId) {
      where.parentTask = { id: parentTaskId };
    }

    return this.taskRepository.find({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  private async validateBeforeCreate(
    projectId: string,
    dto: CreateTaskDto
  ): Promise<void> {
    await this.taskUtils.ensureNameUnique(projectId, dto.title);

    if (dto.parentTaskId) {
      await this.taskUtils.ensureParentTaskExists(projectId, dto.parentTaskId);
    }
  }
}
