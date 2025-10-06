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
import { WorkspaceService } from "src/modules/workspace/services/workspace.service";
import { UserService } from "src/modules/user/services/user.service";
import { TaskUtilsService } from "./task-utils.service";
import { TaskStatus } from "../constants/task.constant";
import { TaskQueryDto } from "../dto/task-query.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskUtils: TaskUtilsService,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService
  ) {}

  async create(
    workspaceId: string,
    currentUserId: string,
    dto: CreateTaskDto
  ): Promise<Task> {
    await this.validateBeforeCreate(workspaceId, dto);

    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);
    const level = dto.parent_task_id
      ? (await this.taskUtils.getLevel(dto.parent_task_id)) + 1
      : 0;

    const task = this.taskRepository.create({
      ...dto,
      workspaceId,
      workspace,
      level,
      creator_id: currentUserId,
      parent_task: dto.parent_task_id ? { id: dto.parent_task_id } : undefined,
    });

    return this.taskRepository.save(task);
  }

  async createWithChildren(
    workspaceId: string,
    currentUserId: string,
    dto: CreateTaskDto & { sub_tasks?: CreateTaskDto[] }
  ): Promise<Task> {
    await this.validateBeforeCreate(workspaceId, dto);

    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);
    const level = dto.parent_task_id
      ? (await this.taskUtils.getLevel(dto.parent_task_id)) + 1
      : 0;

    const task = this.taskRepository.create({
      ...dto,
      workspaceId,
      workspace,
      level,
      creator_id: currentUserId,
      parent_task: dto.parent_task_id ? { id: dto.parent_task_id } : undefined,
    });

    const savedTask = await this.taskRepository.save(task);

    if (dto.sub_tasks?.length) {
      const subTasks = await Promise.all(
        dto.sub_tasks.map((child) =>
          this.createWithChildren(workspaceId, currentUserId, {
            ...child,
            parent_task_id: savedTask.id,
          })
        )
      );
      savedTask.sub_tasks = subTasks;
    }

    return savedTask;
  }

  async update(
    workspaceId: string,
    taskId: string,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.findTaskById(workspaceId, taskId);

    if (dto.title && dto.title !== task.title) {
      await this.taskUtils.ensureNameUnique(workspaceId, dto.title);
    }

    if (dto.parent_task_id) {
      await this.taskUtils.ensureParentTaskExists(
        workspaceId,
        dto.parent_task_id
      );
    }

    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async updateStatus(
    workspaceId: string,
    taskId: string,
    status: TaskStatus
  ): Promise<Task> {
    const task = await this.findTaskById(workspaceId, taskId);

    if (task.sub_tasks?.length) {
      throw new ConflictException(
        "Cannot update status of a task with sub-tasks. Update sub-tasks first."
      );
    }

    task.status = status;
    return this.taskRepository.save(task);
  }

  async delete(workspaceId: string, taskId: string): Promise<void> {
    const task = await this.findTaskById(workspaceId, taskId);
    await this.taskRepository.remove(task);
  }

  async findTaskById(workspaceId: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, workspaceId },
      relations: ["sub_tasks"],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async getTaskByParentId(
    workspaceId: string,
    parentTaskId: string
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: { workspaceId, parent_task: { id: parentTaskId } },
    });
  }

  async list(workspaceId: string, query: TaskQueryDto): Promise<Task[]> {
    const {
      parent_task_id,
      page = 1,
      limit = 20,
      sortBy = "created_at",
      sortOrder = "ASC",
      ...filters
    } = query;

    const where: any = { workspaceId, ...filters };

    if (parent_task_id) {
      where.parent_task = { id: parent_task_id };
    }

    return this.taskRepository.find({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // -----------------------------
  // 🔹 INTERNAL UTILITIES
  // -----------------------------
  private async validateBeforeCreate(
    workspaceId: string,
    dto: CreateTaskDto
  ): Promise<void> {
    await this.taskUtils.ensureNameUnique(workspaceId, dto.title);

    if (dto.parent_task_id) {
      await this.taskUtils.ensureParentTaskExists(
        workspaceId,
        dto.parent_task_id
      );
    }
  }
}
