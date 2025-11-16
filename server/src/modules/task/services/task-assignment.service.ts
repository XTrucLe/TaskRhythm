import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskAssignee } from "../entities/task-assignee.entity";
import { UserService } from "src/modules/user/services/user.service";
import { TaskQueryService } from "./task-query.service";
import { TaskAssigneeDto } from "../dto/task-assignee/task-assign.dto";
import { Task } from "../entities/task.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EmitterEvent } from "src/common/constants/emitter.constant";

@Injectable()
export class TaskAssignmentService {
  constructor(
    @InjectRepository(TaskAssignee)
    private readonly taskAssigneeRepo: Repository<TaskAssignee>,
    private readonly taskQueryService: TaskQueryService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /** 🔷 Assign a user to a task (Admin/PM action) */
  async assignUserToTask(
    currentUserId: string,
    { userId, taskId }: TaskAssigneeDto
  ): Promise<TaskAssignee> {
    // TODO: Verify if currentUserId has permission to assign users to this task

    if (currentUserId === userId) {
      throw new ConflictException(`Use claimTask to assign yourself to a task`);
    }

    const user = await this.userService.getUserById(userId);

    await this.notAlreadyAssigned(taskId, userId);
    await this.userCanAssignTask(taskId, currentUserId);

    const taskAssignee = this.taskAssigneeRepo.create({
      taskId,
      assigneeId: user.id,
      assignee: user,
      task: { id: taskId },
    });

    this.eventEmitter.emit(EmitterEvent.TASK_ASSIGN_CREATED, taskAssignee);

    return this.taskAssigneeRepo.save(taskAssignee);
  }

  /** 🔷 Remove a user from a task */
  async removeUserFromTask(
    currentUserId: string,
    { userId, taskId }: TaskAssigneeDto
  ): Promise<void> {
    // TODO: Verify if currentUserId has permission
    await this.taskExists(taskId);

    const result = await this.taskAssigneeRepo.delete({
      taskId,
      assigneeId: userId,
    });
    if (!result.affected) {
      throw new NotFoundException(
        `User ${userId} is not assigned to task ${taskId}`
      );
    }
    this.eventEmitter.emit(EmitterEvent.TASK_ASSIGN_REMOVED, {
      userId,
      taskId,
    });
  }

  /** 🔷 User claims a task (self-assign) */
  async claimTask(
    currentUserId: string,
    taskId: string
  ): Promise<TaskAssignee> {
    const user = await this.userService.getUserById(currentUserId);

    await this.notAlreadyAssigned(taskId, currentUserId);
    await this.userCanAssignTask(taskId, currentUserId);

    const taskAssignee = this.taskAssigneeRepo.create({
      taskId,
      assigneeId: user.id,
      assignee: user,
    });

    this.eventEmitter.emit(EmitterEvent.TASK_CLAIMED, taskAssignee);

    return this.taskAssigneeRepo.save(taskAssignee);
  }

  /** 🔷 User unclaims a task (self-unassign) */
  async unclaimTask(currentUserId: string, taskId: string): Promise<void> {
    await this.taskExists(taskId);

    const existingAssignment = await this.taskAssigneeRepo.findOneBy({
      taskId,
      assigneeId: currentUserId,
    });

    if (!existingAssignment) {
      throw new NotFoundException(`You are not assigned to this task`);
    }

    await this.taskAssigneeRepo.delete(existingAssignment.id);
    this.eventEmitter.emit(EmitterEvent.TASK_UNCLAIMED, {
      userId: currentUserId,
      taskId,
    });
  }

  /** 🧩 Helper: Check if task exists */
  private async taskExists(taskId: string): Promise<Task> {
    return await this.taskQueryService.findById(taskId);
  }

  /** 🧩 Helper: Check if already assigned */
  private async notAlreadyAssigned(
    taskId: string,
    userId: string
  ): Promise<void> {
    const existing = await this.taskAssigneeRepo.findOneBy({
      taskId,
      assigneeId: userId,
    });
    if (existing) {
      throw new ConflictException(
        `User ${userId} is already assigned to task ${taskId}`
      );
    }
  }

  private async userCanAssignTask(
    taskId: string,
    currentUser: string
  ): Promise<void> {
    const task = await this.taskQueryService.findById(taskId);
    if (currentUser !== "system") {
      if (task.level < 2)
        throw new ConflictException(`Only subtasks can be assigned to users`);
      if (task.assignees && task.assignees.length > 0)
        throw new ConflictException(
          `Task ${taskId} is already assigned and cannot be reassigned`
        );
    }
  }
}
