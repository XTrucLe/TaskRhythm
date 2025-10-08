import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";
import { CreateProjectDto } from "../dto/project/create-project.dto";
import { UpdateProjectDto } from "../dto/project/update-project.dto";
import { WorkspaceService } from "src/modules/workspace/services/workspace.service";
import { ProjectStats } from "../entities/project_stats.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectStats)
    private readonly projectStatsRepository: Repository<ProjectStats>,
    @Inject(forwardRef(() => WorkspaceService))
    private readonly workspaceService: WorkspaceService
  ) {}

  async createProject(
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
    const newProject = await this.projectRepository.save(project);
    await this.createProjectStats(newProject.id);
    return newProject;
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
      relations: ["stats"],
    });
    if (!project) {
      throw new NotFoundException(
        `Project with ID ${project_id} not found in workspace ${workspace_id}`
      );
    }
    return project;
  }

  async getProjectInWorkspace(workspace_id: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: { workspace_id },
      relations: ["stats"],
    });
    return projects;
  }

  async createProjectStats(project_id: string): Promise<ProjectStats> {
    const stats = this.projectStatsRepository.create({ project_id });
    return this.projectStatsRepository.save(stats);
  }
}
