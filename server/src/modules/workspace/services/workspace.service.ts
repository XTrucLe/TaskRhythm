import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
  forwardRef,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workspace } from "../entities/workspace.entity";
import { CreateWorkspaceDto, UpdateWorkspaceDto } from "../dto";
import { WorkspaceMemberService } from "./workspace-member.service";
import { WorkspaceRole } from "../constants/workspace-role.constant";

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @Inject(forwardRef(() => WorkspaceMemberService))
    private readonly workspaceMemberService: WorkspaceMemberService
  ) {}

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    currentUserId: string
  ): Promise<Workspace> {
    if (
      await this.workspaceRepository.findOne({
        where: { name: createWorkspaceDto.name },
      })
    ) {
      throw new ConflictException(
        `Workspace with name ${createWorkspaceDto.name} already exists`
      );
    }

    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    const save = await this.workspaceRepository.save({
      ...workspace,
      ownerId: currentUserId,
    });

    await this.workspaceMemberService.addMember({
      userId: currentUserId,
      workspaceId: save.id,
      role: WorkspaceRole.LEADER,
    });

    return { ...save, totalMembers: 1 };
  }

  async updateWorkspace(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto
  ): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace ${id} not found`);
    }

    Object.assign(workspace, updateWorkspaceDto);

    const updated = await this.workspaceRepository.save(workspace);
    return updated;
  }

  async deleteWorkspace(id: string, userId: string): Promise<void> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
      relations: ["owner"],
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace ${id} not found`);
    }
    if (workspace.ownerId !== userId) {
      throw new ForbiddenException(
        `You are not allowed to delete this workspace`
      );
    }
    await this.workspaceRepository.remove(workspace);
  }

  async getWorkspaceById(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace ${id} not found`);
    }
    return workspace;
  }

  async getWorkspaceEntity(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace ${id} not found`);
    }
    return workspace;
  }

  async getAllWorkspaces(): Promise<Workspace[]> {
    const workspaces = await this.workspaceRepository.find();
    return workspaces;
  }
}
