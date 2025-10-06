import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TaskService } from "../services/task.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { TaskMapper } from "../mapppers/task.mapper";
import { TaskQueryDto } from "../dto/task-query.dto";
import {
  TaskResponseDto,
  TaskResponseWithChildDto,
} from "../dto/task-response.dto";

@Controller("workspaces/:workspaceId/tasks")
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskMapper: TaskMapper
  ) {}

  @Post()
  async create(
    @Param("workspaceId") workspaceId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.create(workspaceId, userId, dto);
    return this.taskMapper.toDto(task);
  }

  @Post("with-children")
  async createWithChildren(
    @Param("workspaceId") workspaceId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: CreateTaskDto & { sub_tasks?: CreateTaskDto[] }
  ): Promise<TaskResponseWithChildDto> {
    const task = await this.taskService.createWithChildren(
      workspaceId,
      userId,
      dto
    );
    return this.taskMapper.toDtoWithChildren(task);
  }

  @Get()
  async list(
    @Param("workspaceId") workspaceId: string,
    @Query() query: TaskQueryDto
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.taskService.list(workspaceId, query);
    return this.taskMapper.toDtos(tasks);
  }

  @Get(":taskId")
  async getById(
    @Param("workspaceId") workspaceId: string,
    @Param("taskId") taskId: string
  ): Promise<TaskResponseWithChildDto> {
    const task = await this.taskService.findTaskById(workspaceId, taskId);
    return this.taskMapper.toDtoWithChildren(task);
  }

  @Patch(":taskId")
  async update(
    @Param("workspaceId") workspaceId: string,
    @Param("taskId") taskId: string,
    @Body() dto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    const updated = await this.taskService.update(workspaceId, taskId, dto);
    return this.taskMapper.toDto(updated);
  }

  @Delete(":taskId")
  async remove(
    @Param("workspaceId") workspaceId: string,
    @Param("taskId") taskId: string
  ): Promise<void> {
    await this.taskService.delete(workspaceId, taskId);
  }
}
