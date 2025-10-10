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

@Controller("projects/:projectId/tasks")
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskMapper: TaskMapper
  ) {}

  @Post()
  async create(
    // ✅ THAY ĐỔI 2: Lấy projectId từ URL, bỏ workspaceId
    @Param("projectId") projectId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: CreateTaskDto
  ): Promise<TaskResponseDto> {
    // Truyền projectId vào service
    const task = await this.taskService.create(projectId, userId, dto);
    return this.taskMapper.toDto(task);
  }

  @Post("with-children")
  async createWithChildren(
    @Param("projectId") projectId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: CreateTaskDto & { subTasks?: CreateTaskDto[] }
  ): Promise<TaskResponseWithChildDto> {
    const task = await this.taskService.createWithChildren(
      projectId,
      userId,
      dto
    );
    return this.taskMapper.toDtoWithChildren(task);
  }

  @Get()
  async list(
    @Param("projectId") projectId: string,
    @Query() query: TaskQueryDto
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.taskService.list(projectId, query);
    return this.taskMapper.toDtos(tasks);
  }

  @Get(":taskId")
  async getById(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string
  ): Promise<TaskResponseWithChildDto> {
    // Service của bạn đã nhận projectId, nên không cần sửa ở đây
    const task = await this.taskService.findTaskById(projectId, taskId);
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
