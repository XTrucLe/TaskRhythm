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
    workspace_id: string,
    currentUserId: string,
    dto: CreateTaskDto
  ): Promise<Task> {
    await this.validateBeforeCreate(workspace_id, dto);

    const workspace = await this.workspaceService.getWorkspaceById(
      workspace_id
    );
    const level = dto.parent_task_id
      ? (await this.taskUtils.getLevel(dto.parent_task_id)) + 1
      : 0;

    const task = this.taskRepository.create({
      ...dto,
      workspace_id,
      workspace,
      level,
      creator_id: currentUserId,
      parent_task: dto.parent_task_id ? { id: dto.parent_task_id } : undefined,
    });

    return this.taskRepository.save(task);
  }

  async createWithChildren(
    workspace_id: string,
    currentUserId: string,
    dto: CreateTaskDto & { sub_tasks?: CreateTaskDto[] }
  ): Promise<Task> {
    await this.validateBeforeCreate(workspace_id, dto);

    const workspace = await this.workspaceService.getWorkspaceById(
      workspace_id
    );
    const level = dto.parent_task_id
      ? (await this.taskUtils.getLevel(dto.parent_task_id)) + 1
      : 0;

    const task = this.taskRepository.create({
      ...dto,
      workspace_id,
      workspace,
      level,
      creator_id: currentUserId,
      parent_task: dto.parent_task_id ? { id: dto.parent_task_id } : undefined,
    });

    const savedTask = await this.taskRepository.save(task);

    if (dto.sub_tasks?.length) {
      const subTasks = await Promise.all(
        dto.sub_tasks.map((child) =>
          this.createWithChildren(workspace_id, currentUserId, {
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
    workspace_id: string,
    taskId: string,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.findTaskById(workspace_id, taskId);

    if (dto.title && dto.title !== task.title) {
      await this.taskUtils.ensureNameUnique(workspace_id, dto.title);
    }

    if (dto.parent_task_id) {
      await this.taskUtils.ensureParentTaskExists(
        workspace_id,
        dto.parent_task_id
      );
    }

    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async updateStatus(
    workspace_id: string,
    taskId: string,
    status: TaskStatus
  ): Promise<Task> {
    const task = await this.findTaskById(workspace_id, taskId);

    if (task.sub_tasks?.length) {
      throw new ConflictException(
        "Cannot update status of a task with sub-tasks. Update sub-tasks first."
      );
    }

    task.status = status;
    return this.taskRepository.save(task);
  }

  async delete(workspace_id: string, taskId: string): Promise<void> {
    const task = await this.findTaskById(workspace_id, taskId);
    await this.taskRepository.remove(task);
  }

  async findTaskById(workspace_id: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, workspace_id },
      relations: ["sub_tasks"],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async getTaskByParentId(
    workspace_id: string,
    parentTaskId: string
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: { workspace_id, parent_task: { id: parentTaskId } },
    });
  }

  async list(workspace_id: string, query: TaskQueryDto): Promise<Task[]> {
    const {
      parent_task_id,
      page = 1,
      limit = 20,
      sortBy = "created_at",
      sortOrder = "ASC",
      ...filters
    } = query;

    const where: any = { workspace_id, ...filters };

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
    workspace_id: string,
    dto: CreateTaskDto
  ): Promise<void> {
    await this.taskUtils.ensureNameUnique(workspace_id, dto.title);

    if (dto.parent_task_id) {
      await this.taskUtils.ensureParentTaskExists(
        workspace_id,
        dto.parent_task_id
      );
    }
  }
}
