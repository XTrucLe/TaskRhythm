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
import {
  CreateTaskDto,
  CreateTaskWithSubTasksDto,
} from "../dto/task/create-task.dto";
import { UpdateTaskDto } from "../dto/task/update-task.dto";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { TaskMapper } from "../mapppers/task.mapper";
import { TaskQueryDto } from "../dto/task/task-query.dto";
import {
  TaskResponseDto,
  TaskResponseWithChildDto,
} from "../dto/task/task-response.dto";
import { TaskQueryService } from "../services/task-query.service";

@Controller("projects/:projectId/tasks")
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskQueryService: TaskQueryService,
    private readonly taskMapper: TaskMapper
  ) {}

  @Post()
  async create(
    @Param("projectId") projectId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.createTask(projectId, userId, dto);
    return this.taskMapper.toDto(task);
  }

  @Get()
  async list(
    @Param("projectId") projectId: string,
    @Query() query: TaskQueryDto
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.taskQueryService.list(projectId, query);
    return this.taskMapper.toDtos(tasks);
  }

  @Get(":taskId")
  async getById(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string
  ): Promise<TaskResponseWithChildDto> {
    const task = await this.taskQueryService.getTaskById(projectId, taskId);
    return this.taskMapper.toDtoWithChildren(task);
  }

  @Patch(":taskId")
  async update(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string,
    @Body() dto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    const updated = await this.taskService.update(projectId, taskId, dto);
    return this.taskMapper.toDto(updated);
  }

  @Delete(":taskId")
  async remove(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string
  ): Promise<void> {
    await this.taskService.delete(projectId, taskId);
  }
}
