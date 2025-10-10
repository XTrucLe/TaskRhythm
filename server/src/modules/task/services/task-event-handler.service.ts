import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TaskService } from "./task.service";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import {
  TaskCreatedEvent,
  TaskUpdatedStatusEvent,
} from "src/common/events/task.event";

@Injectable()
export class TaskEventHandlerService {
  constructor(private readonly taskService: TaskService) {}

  //   @OnEvent(EmitterEvent.TASK_CREATED)
  //   async handleTaskCreatedEvent(payload: TaskCreatedEvent) {
  //     if (!payload.taskId || !payload.parentTaskId) return;
  //   }
}
