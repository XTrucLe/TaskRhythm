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
import { EmitterEvent } from "src/common/constants/emitter.constant";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly workspaceService: WorkspaceService,
    private emitter: EventEmitter2
  ) {}

  async createProject(
    workspaceId: string,
    creatorId: string,
    dto: CreateProjectDto
  ): Promise<Project> {
    this.workspaceService.getWorkspaceById(workspaceId);
    const project = this.projectRepository.create({
      ...dto,
      creatorId,
      workspaceId,
    });
    const newProject = await this.projectRepository.save(project);
    this.emitter.emit(EmitterEvent.PROJECT_CREATED, {
      projectId: newProject.id,
      creatorId,
      workspaceId,
    });
    return newProject;
  }

  async update(projectId: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.getProjectById(projectId);
    Object.assign(project, dto);
    return this.projectRepository.save(project);
  }

  async delete(workspaceId: string, projectId: string): Promise<void> {
    const project = await this.getProjectById(projectId);
    await this.projectRepository.remove(project);
  }

  async getProjectById(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ["stats"],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return project;
  }

  async getProjectInWorkspace(workspaceId: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: { workspaceId },
      relations: ["stats"],
    });
    return projects;
  }
}
