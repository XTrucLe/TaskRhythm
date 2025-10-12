import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TaskService } from "./task.service";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import { TaskDependencyAddedEvent } from "src/common/events/task.event";

@Injectable()
export class TaskEventHandlerService {
  constructor(private readonly taskService: TaskService) {}

  @OnEvent(EmitterEvent.TASK_DEPENDENCY_ADDED)
  async handleTaskDependencyAddedEvent(payload: TaskDependencyAddedEvent) {
    const { projectId, taskId } = payload;
    this.taskService.toggleBlock(projectId, taskId, "block");
  }

  @OnEvent(EmitterEvent.TASK_DEPENDENCY_REMOVED)
  async handleTaskDependencyRemovedEvent(payload: TaskDependencyAddedEvent) {
    const { projectId, taskId } = payload;
    this.taskService.toggleBlock(projectId, taskId, "unblock");
  }

  @OnEvent(EmitterEvent.TASK_UNLOCKED)
  async handleTaskUnlockedEvent(payload: {
    projectId: string;
    taskId: string;
  }) {
    const { projectId, taskId } = payload;
    this.taskService.toggleBlock(projectId, taskId, "unblock");
  }

  @OnEvent(EmitterEvent.TASK_STATUS_UPDATED)
  async handleTaskStatusUpdatedEvent(payload: {
    projectId: string;
    taskId: string;
    status: string;
  }) {
    const { projectId, taskId, status } = payload;
    if (status === "completed") {
      this.taskService.toggleBlock(projectId, taskId, "unblock");
    }
  }
}
