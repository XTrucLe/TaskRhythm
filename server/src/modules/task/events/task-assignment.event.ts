import { Injectable, Logger } from "@nestjs/common";
import { EmitterEvent } from "src/common/constants/emitter.constant";
import { OnEvent } from "@nestjs/event-emitter";
import { TaskAssignmentService } from "../services/task-assignment.service";
import { TaskQueryService } from "./../services/task-query.service";

@Injectable()
export class TaskAssignmentEventHandler {
  constructor(
    private readonly taskQueryService: TaskQueryService,
    private readonly taskAssignmentService: TaskAssignmentService
  ) {}

  @OnEvent(EmitterEvent.TASK_ASSIGN_CREATED)
  async handleTaskAssignCreated(event: { assigneeId: string; taskId: string }) {
    const { taskId, assigneeId } = event;
    Logger.log(
      `Handling TASK_ASSIGN_CREATED for task ${JSON.stringify(taskId)}`,
      "TaskAssignmentEventHandler"
    );
    const task = await this.taskQueryService.findById(taskId);

    if (task.parentId) {
      await this.taskAssignmentService.assignUserToTask("system", {
        userId: assigneeId,
        taskId: task.parentId,
      });
    }
  }

  @OnEvent(EmitterEvent.TASK_ASSIGN_REMOVED)
  async handleTaskAssignRemoved(event: { userId: string; taskId: string }) {
    const { userId, taskId } = event;
    const task = await this.taskQueryService.findById(taskId);
    if (task.parentId) {
      await this.taskAssignmentService.removeUserFromTask("system", {
        userId,
        taskId: task.parentId,
      });
    }
  }

  @OnEvent(EmitterEvent.TASK_CLAIMED)
  async handleTaskClaimed(event: { assigneeId: string; taskId: string }) {
    const { taskId, assigneeId } = event;
    const task = await this.taskQueryService.findById(taskId);

    if (task.parentId) {
      await this.taskAssignmentService.assignUserToTask("system", {
        userId: assigneeId,
        taskId: task.parentId,
      });
    }
  }

  @OnEvent(EmitterEvent.TASK_UNCLAIMED)
  async handleTaskUnclaimed(event: { userId: string; taskId: string }) {
    const { userId, taskId } = event;
    const task = await this.taskQueryService.findById(taskId);
    if (task.parentId) {
      await this.taskAssignmentService.unclaimTask(userId, task.parentId);
    }
  }
}
