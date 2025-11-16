import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { TaskAssignmentService } from "../services/task-assignment.service";
import { TaskAssignee } from "../entities/task-assignee.entity";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { AssignTaskDto } from "../dto/task-assignee/task-assign.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("tasks/:taskId/assignees")
export class TaskAssignmentController {
  constructor(private readonly taskAssignmentService: TaskAssignmentService) {}

  /** 🔷 Assign a user to a task (PM/Admin) */
  @Post()
  async assignUserToTask(
    @Param("taskId") taskId: string,
    @CurrentUser("id") currentUserId: string,
    @Body() dto: AssignTaskDto
  ): Promise<{ message: string; data: TaskAssignee }> {
    const taskAssignee: TaskAssignee =
      await this.taskAssignmentService.assignUserToTask(currentUserId, {
        userId: dto.userId,
        taskId,
      });

    return {
      message: `User ${taskAssignee.assigneeId} assigned to task ${taskId}`,
      data: taskAssignee,
    };
  }

  /** 🔷 Remove a user from a task (PM/Admin) */
  @Delete(":userId")
  async removeUserFromTask(
    @Param("taskId") taskId: string,
    @CurrentUser("id") currentUserId: string,
    @Param("userId") userId: string
  ): Promise<{ message: string }> {
    await this.taskAssignmentService.removeUserFromTask(currentUserId, {
      userId,
      taskId,
    });
    return { message: `User ${userId} removed from task ${taskId}` };
  }

  /** 🔷 Claim a task (self-assign) */
  @Post("claim")
  async claimTask(
    @Param("taskId") taskId: string,
    @CurrentUser("id") currentUserId: string
  ): Promise<{ message: string; data: TaskAssignee }> {
    const taskAssignee: TaskAssignee =
      await this.taskAssignmentService.claimTask(currentUserId, taskId);

    return {
      message: `User ${taskAssignee.assigneeId} claimed task ${taskId}`,
      data: taskAssignee,
    };
  }

  /** 🔷 Unclaim a task (self-unassign) */
  @Delete("self")
  async unclaimTask(
    @Param("taskId") taskId: string,
    @CurrentUser("id") currentUserId: string
  ): Promise<{ message: string }> {
    await this.taskAssignmentService.unclaimTask(currentUserId, taskId);
    return { message: `User ${currentUserId} unclaimed task ${taskId}` };
  }
}
