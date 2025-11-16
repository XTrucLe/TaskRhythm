import { plainToInstance } from "class-transformer";
import { TaskAssignee } from "../entities/task-assignee.entity";
import { TaskAssigneeResponseDto } from "../dto/task-assignee/task-assign.dto";

export class TaskAssignmentMapper {
  /** 🧩 Map TaskAssignee entity to TaskAssigneeResponseDto */
  toTaskAssigneeResponseDto(
    taskAssignee: TaskAssignee
  ): TaskAssigneeResponseDto {
    return plainToInstance(TaskAssigneeResponseDto, taskAssignee.assignee, {
      excludeExtraneousValues: true,
    });
  }
}
