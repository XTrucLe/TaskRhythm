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
import { TaskStatus } from "../constants/task.constant";
import { WorkspaceService } from "src/modules/workspace/services/workspace.service";
import { UserService } from "src/modules/user/services/user.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService
  ) {}

  async create(
    workspaceId: string,
    currentUserId: string,
    createTaskDto: CreateTaskDto
  ): Promise<Task> {
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);

    if (await this.existsTaskName(workspaceId, createTaskDto.title)) {
      throw new ConflictException(
        `Task with name ${createTaskDto.title} already exists in workspace ${workspace.name}`
      );
    }

    if (createTaskDto.parent_task_id) {
      await this.existsParentTask(workspaceId, createTaskDto.parent_task_id);
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      workspaceId,
      workspace,
      creator_id: currentUserId,
    });

    return this.taskRepository.save(task);
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  private async existsParentTask(
    workspaceId: string,
    parentTaskId: string
  ): Promise<void> {
    const exists = await this.existsTaskId(workspaceId, parentTaskId);
    if (!exists) {
      throw new NotFoundException(
        `Parent Task with ID ${parentTaskId} not found in workspace ${workspaceId}`
      );
    }
  }

  private async existsTaskId(
    workspaceId: string,
    taskId: string
  ): Promise<boolean> {
    return await this.taskRepository.exists({
      where: { id: taskId, workspaceId },
    });
  }

  private async existsTaskName(
    workspaceId: string,
    title: string
  ): Promise<boolean> {
    return await this.taskRepository.exists({
      where: { title, workspaceId },
    });
  }
}
