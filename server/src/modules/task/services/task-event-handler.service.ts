import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TaskService } from "./task.service";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import { TaskDependencyAddedEvent } from "src/common/events/task.event";

@Injectable()
export class TaskEventHandlerService {
  constructor(private readonly taskService: TaskService) {}

  @OnEvent(EmitterEvent.TASK_STATUS_UPDATED)
  async handleTaskStatusUpdated(event: {
    projectId: string;
    taskId: string;
    userId: string;
    oldStatus: string;
    newStatus: string;
  }) {
    const { projectId, taskId, newStatus } = event;

    if (newStatus === "done") {
      await this.taskService.update(projectId, taskId, { progress: 100 });
    }
  }
}
