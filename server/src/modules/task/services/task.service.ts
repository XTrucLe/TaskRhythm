import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { CreateTaskDto } from "../dto/task/create-task.dto";
import { UpdateTaskDto } from "../dto/task/update-task.dto";
import { TaskQueryService } from "./task-query.service";
import { ProjectService } from "src/modules/project/services/project.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EmitterEvent } from "src/common/constants/emitter.constant";
import { TaskStatus } from "../constants/task.constant";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskQuery: TaskQueryService,
    private readonly projectService: ProjectService,
    private readonly emitter: EventEmitter2
  ) {}

  async createTask(
    projectId: string,
    currentUserId: string,
    createDto: CreateTaskDto
  ): Promise<Task> {
    const project = await this.projectService.getProjectById(projectId);
    const level = await this.computeLevel(projectId, createDto.parentId);

    if (level > 2) {
      throw new ConflictException("Cannot create task deeper than level 2");
    }

    const task = this.taskRepository.create({
      ...createDto,
      project,
      projectId,
      creator: { id: currentUserId },
      level,
    });
    task.path = await this.createPath(
      createDto.parentId || "",
      createDto.title
    );
    const saved = await this.taskRepository.save(task);

    this.emitter.emit(EmitterEvent.TASK_CREATED, {
      projectId,
      taskId: saved.id,
      userId: currentUserId,
      status: saved.status,
      priority: saved.priority,
    });

    return saved;
  }

  async update(
    projectId: string,
    taskId: string,
    dto: UpdateTaskDto,
    options?: { bypassLevelCheck?: boolean }
  ): Promise<Task> {
    const task = await this.taskQuery.getTaskById(projectId, taskId);
    const oldTask = { ...task };

    // Check for changes to avoid unnecessary updates
    const hasChange = (Object.keys(dto) as (keyof UpdateTaskDto)[]).some(
      (key) => task[key as keyof Task] !== dto[key]
    );
    if (!hasChange) {
      throw new ConflictException("No changes detected in the update request");
    }

    // Restrict status update to level 2 tasks
    if (options && !options.bypassLevelCheck && dto.status && task.level < 2) {
      throw new ConflictException(
        "Only level 2 tasks can have their status updated"
      );
    }

    // Auto-set completedAt if status becomes DONE or DONE_LATE
    if (
      dto.status &&
      [TaskStatus.DONE, TaskStatus.DONE_LATE].includes(dto.status as TaskStatus)
    ) {
      dto.completedAt ??= new Date().toISOString();
    }

    // Merge and save
    const updated = this.taskRepository.merge(task, dto);
    const saved = await this.taskRepository.save(updated);

    // Emit events
    this.emitter.emit(EmitterEvent.TASK_UPDATED, {
      projectId,
      taskId,
      userId: task.creator.id,
    });

    if (dto.status) {
      this.emitter.emit(EmitterEvent.TASK_STATUS_UPDATED, {
        projectId,
        taskId,
        oldStatus: oldTask.status,
        newStatus: dto.status,
      });
    }

    if (dto.priority) {
      this.emitter.emit(EmitterEvent.TASK_PRIORITY_CHANGED, {
        projectId,
        taskId,
        oldPriority: oldTask.priority,
        newPriority: dto.priority,
      });
    }

    return saved;
  }

  async delete(projectId: string, taskId: string): Promise<void> {
    const task = await this.taskQuery.getTaskById(projectId, taskId);
    await this.taskRepository.remove(task);

    this.emitter.emit(EmitterEvent.TASK_DELETED, {
      projectId,
      taskId,
      status: task.status,
      priority: task.priority,
    });
  }

  async computeProgress(projectId: string, taskId: string): Promise<void> {
    const [currentTask, subtasks] = await Promise.all([
      this.taskQuery.findById(taskId),
      this.taskRepository.find({
        where: { parentId: taskId, projectId },
        select: ["id", "progress", "estimatedHours"],
      }),
    ]);

    let progress = 0;
    if (subtasks.length === 0) {
      progress = currentTask.status.includes("done") ? 100 : 0;
    } else {
      const totalWeight = subtasks.reduce(
        (sum, subtask) => sum + (subtask.estimatedHours || 1),
        0
      );

      for (const subtask of subtasks) {
        const weight = subtask.estimatedHours || 1;
        progress += (subtask.progress * weight) / totalWeight;
      }
    }
    const updated = await this.update(projectId, taskId, {
      progress: progress,
    });

    // Automatically update status based on progress 1
    const newStatus = this.updateStatusBasedOnProgress(
      updated.status,
      updated.progress,
      updated.dueDate
    );

    if (newStatus) {
      await this.update(
        projectId,
        taskId,
        { status: newStatus },
        { bypassLevelCheck: true }
      );
    }

    this.emitter.emit(EmitterEvent.TASK_PROGRESS_CHANGED, {
      projectId,
      parentId: updated.parentId,
    });
  }

  // --- PRIVATE HELPERS --- //
  private async computeLevel(
    projectId: string,
    parentTaskId?: string
  ): Promise<number> {
    if (!parentTaskId) return 0;

    const parent = await this.taskRepository.findOne({
      where: { id: parentTaskId, projectId },
      select: ["level"],
    });

    if (!parent) {
      throw new NotFoundException(
        `Parent task ${parentTaskId} not found in project ${projectId}`
      );
    }

    return parent.level + 1;
  }

  private async createPath(parentId: string, title: string): Promise<string> {
    if (!parentId) {
      return `/${title.replace(/\s+/g, "-").toLowerCase()}`;
    }
    const parent = await this.taskRepository.findOne({
      where: { id: parentId },
      select: ["path"],
    });
    if (!parent) {
      throw new NotFoundException(`Parent task ${parentId} not found`);
    }
    return `${parent.path}/${title.replace(/\s+/g, "-").toLowerCase()}`;
  }

  private updateStatusBasedOnProgress(
    currentStatus: TaskStatus,
    progress: number,
    dueDate?: Date
  ): TaskStatus | null {
    let newStatus: TaskStatus;
    if (progress === 100) {
      const isLate = dueDate ? new Date() > dueDate : false;
      newStatus = isLate ? TaskStatus.DONE_LATE : TaskStatus.DONE;
    } else if (progress > 0) {
      newStatus = TaskStatus.DOING;
    } else {
      newStatus = TaskStatus.TODO;
    }
    return newStatus !== currentStatus ? newStatus : null;
  }
}
