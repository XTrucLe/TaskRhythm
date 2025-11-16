import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TaskService } from "../services/task.service";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import { TaskStatus } from "../constants/task.constant";

@Injectable()
export class TaskEventHandler {
  constructor(private readonly taskService: TaskService) {}

  @OnEvent(EmitterEvent.TASK_STATUS_UPDATED)
  async handleTaskStatusUpdated(event: { projectId: string; taskId: string }) {
    const { projectId, taskId } = event;

    await this.taskService.computeProgress(projectId, taskId);
  }

  @OnEvent(EmitterEvent.TASK_PROGRESS_CHANGED)
  async handleTaskProgressChanged(event: {
    projectId: string;
    parentId: string;
  }) {
    const { projectId, parentId } = event;
    if (parentId) {
      this.taskService.computeProgress(projectId, parentId);
    }
  }
}
