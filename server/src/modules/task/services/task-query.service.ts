import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { TaskQueryDto } from "../dto/task/task-query.dto";

@Injectable()
export class TaskQueryService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async getTaskById(
    projectId: string,
    taskId: string,
    relations?: string[]
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, project: { id: projectId } },
      relations: relations || ["subTasks", "assignee", "creator"],
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found in project ${projectId}`
      );
    }
    return task;
  }

  async findById(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ["subTasks", "assignee", "creator"],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
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
    const where: any = { project: { id: projectId }, ...filters };
    if (parentTaskId) {
      where.parentTask = { id: parentTaskId };
    } else {
      where.level = 0;
    }
    return this.taskRepository.find({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
