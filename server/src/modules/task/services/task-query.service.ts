import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsWhere, ILike } from "typeorm";
import { Task } from "../entities/task.entity";
import { QueryTaskDto } from "../dto/task/query-task.dto";

@Injectable()
export class TaskQueryService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async getTaskById(
    projectId: string,
    taskId: string,
    relations: string[] = ["assignees", "creator"]
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, projectId },
      relations,
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found in project ${projectId}`
      );
    }
    return task;
  }

  async findById(
    taskId: string,
    relations: string[] = ["assignees", "creator", "assignees.assignee"]
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations,
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    Logger.log(JSON.stringify(task), "TaskQueryService");
    return task;
  }

  async list(projectId: string, query: QueryTaskDto): Promise<Task[]> {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      type,
      parentId,
      search,
      sortBy = "createdAt",
      sortOrder = "DESC",
    } = query;

    const where: FindOptionsWhere<Task> = { projectId };

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (type) where.type = type;
    if (parentId) where.parentId = parentId;
    else where.level = 0;

    if (search) {
      where.title = ILike(`%${search}%`);
    }

    return this.taskRepository.find({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      relations: ["creator"],
    });
  }

  async listTrees(projectId: string): Promise<Task[]> {
    const roots = await this.taskRepository.find({
      where: { projectId },
      relations: ["creator", "assignees", "assignees.assignee"],
    });
    return roots;
  }
}
