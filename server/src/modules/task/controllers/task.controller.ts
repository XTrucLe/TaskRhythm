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
import { CreateTaskDto } from "../dto/task/create-task.dto";
import { UpdateTaskDto } from "../dto/task/update-task.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { TaskMapper } from "../mappers/task.mapper";
import { QueryTaskDto } from "../dto/task/query-task.dto";
import { TaskResponseDto } from "../dto/task/task-response.dto";
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
    @CurrentUser("currentUser") currentUser: any,
    @Body() dto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    const task = await this.taskService.createTask(
      projectId,
      currentUser.id,
      dto
    );
    return this.taskMapper.toDto(task);
  }

  @Get()
  async list(
    @Param("projectId") projectId: string,
    @Query() query: QueryTaskDto
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.taskQueryService.list(projectId, query);
    return this.taskMapper.toDtos(tasks);
  }

  @Get("tree")
  async listTrees(
    @Param("projectId") projectId: string
  ): Promise<(TaskResponseDto & { children?: TaskResponseDto[] })[]> {
    const tasks = await this.taskQueryService.listTrees(projectId);
    return this.taskMapper.toDtosTree(tasks);
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

  @Get(":taskId")
  async getTaskById(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string
  ): Promise<TaskResponseDto> {
    const task = await this.taskQueryService.findById(taskId);
    return this.taskMapper.toDto(task);
  }
}
