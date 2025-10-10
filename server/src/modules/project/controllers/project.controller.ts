import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ProjectService } from "../services/project.service";
import { CreateProjectDto } from "../dto/project/create-project.dto";
import { UpdateProjectDto } from "../dto/project/update-project.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { ProjectMapper } from "../mappers/project.mapper";
import { ProjectResponseWithStatsDto } from "../dto/project/project-response.dto";

@Controller("workspaces/:workspace_id/projects")
@UseGuards(AuthGuard("jwt"))
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectMapper: ProjectMapper
  ) {}

  @Post()
  async createProject(
    @Param("workspace_id") workspace_id: string,
    @CurrentUser("id") currentUserId: string,
    @Body() dto: CreateProjectDto
  ): Promise<ProjectResponseWithStatsDto> {
    const project = await this.projectService.createProject(
      workspace_id,
      currentUserId,
      dto
    );
    return this.projectMapper.toDtoWithStats(project);
  }

  @Put(":project_id")
  async updateProject(
    @Param("workspace_id") workspace_id: string,
    @Param("project_id") project_id: string,
    @Body() dto: UpdateProjectDto
  ): Promise<ProjectResponseWithStatsDto> {
    const project = await this.projectService.update(project_id, dto);
    return this.projectMapper.toDtoWithStats(project);
  }

  @Delete(":project_id")
  async deleteProject(
    @Param("workspace_id") workspace_id: string,
    @Param("project_id") project_id: string
  ): Promise<void> {
    return this.projectService.delete(workspace_id, project_id);
  }

  @Get(":project_id")
  async getProjectById(
    @Param("project_id") project_id: string
  ): Promise<ProjectResponseWithStatsDto> {
    const project = await this.projectService.getProjectById(project_id);
    return this.projectMapper.toDtoWithStats(project);
  }
}
