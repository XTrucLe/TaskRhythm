import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskMapper } from "../mapppers/task.mapper";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";

@Controller("workspace/:workspaceId/tasks")
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskMapper: TaskMapper
  ) {}
  @Post()
  async createTask(
    @Param("workspaceId") workspaceId: string,
    @CurrentUser() currentUser: any,
    @Body() createTaskDto: CreateTaskDto
  ) {
    const currentUserId = currentUser.id;
    return this.taskMapper.toDto(
      await this.taskService.create(workspaceId, currentUserId, createTaskDto)
    );
  }
}
