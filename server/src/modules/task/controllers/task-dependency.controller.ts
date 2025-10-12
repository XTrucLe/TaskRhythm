import {
  Body,
  Controller,
  Param,
  Post,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TaskDependencyService } from "./../services/task-dependency.service";
import { CreateTaskDependencyDto } from "../dto/task-dependence/create-task-dependency.dto";

@Controller("projects/:projectId/tasks/:taskId/dependencies")
@UseGuards(AuthGuard("jwt"))
export class TaskDependencyController {
  constructor(private readonly dependencyService: TaskDependencyService) {}
  @Post()
  async addDependency(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string,
    @Body() dto: CreateTaskDependencyDto
  ) {
    return this.dependencyService.addDependency(projectId, taskId, dto);
  }

  @Delete("/:dependencyId")
  async removeDependency(
    @Param("projectId") projectId: string,
    @Param("taskId") taskId: string,
    @Param("dependencyId") dependencyId: string
  ) {
    return this.dependencyService.removeDependency(
      projectId,
      taskId,
      dependencyId
    );
  }
}
