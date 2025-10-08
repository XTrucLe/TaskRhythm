import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";
import { CreateProjectDto } from "../dto/project/create-project.dto";
import { UpdateProjectDto } from "../dto/project/update-project.dto";
import { WorkspaceService } from "src/modules/workspace/services/workspace.service";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly workspaceService: WorkspaceService
  ) {}

  async create(
    workspace_id: string,
    creator_id: string,
    dto: CreateProjectDto
  ): Promise<Project> {
    this.workspaceService.getWorkspaceById(workspace_id);
    const project = this.projectRepository.create({
      ...dto,
      creator_id,
      workspace_id,
    });
    return this.projectRepository.save(project);
  }

  async update(
    workspace_id: string,
    project_id: string,
    dto: UpdateProjectDto
  ): Promise<Project> {
    const project = await this.getProjectById(workspace_id, project_id);
    Object.assign(project, dto);
    return this.projectRepository.save(project);
  }

  async delete(workspace_id: string, project_id: string): Promise<void> {
    const project = await this.getProjectById(workspace_id, project_id);
    await this.projectRepository.remove(project);
  }

  async getProjectById(
    workspace_id: string,
    project_id: string
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: project_id, workspace_id },
    });
    if (!project) {
      throw new NotFoundException(
        `Project with ID ${project_id} not found in workspace ${workspace_id}`
      );
    }
    return project;
  }
}
