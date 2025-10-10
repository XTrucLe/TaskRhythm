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
import { DataSource } from "typeorm";
import { PolicyService } from "./policy.service";
import { WorkspaceAction } from "../constants/workspace_action.constant";
import { EmitterEvent } from "src/common/constants/emitter.constant";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @Inject(forwardRef(() => WorkspaceMemberService))
    private readonly workspaceMemberService: WorkspaceMemberService,
    private dataSource: DataSource,
    private emitter: EventEmitter2
  ) {}

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    currentUserId: string
  ): Promise<Workspace> {
    return await this.dataSource.transaction(async (manager) => {
      const exists = await this.workspaceRepository.exists({
        where: { name: createWorkspaceDto.name },
      });
      if (exists) {
        throw new ConflictException(
          `Workspace with name ${createWorkspaceDto.name} already exists`
        );
      }

      const workspace = this.workspaceRepository.create(createWorkspaceDto);
      const save = await this.workspaceRepository.save({
        ...workspace,
        ownerId: currentUserId,
        totalMembers: 1,
      });

      await this.workspaceMemberService.addMember(
        {
          userId: currentUserId,
          workspaceId: save.id,
          role: WorkspaceRole.LEADER,
        },
        manager
      );
      this.emitter.emit(EmitterEvent.WORKSPACE_CREATED, {
        workspaceId: save.id,
        ownerId: currentUserId,
      });
      return save;
    });
  }

  async updateWorkspace(
    workspaceId: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
    currentUserId: string
  ): Promise<Workspace> {
    const member = await this.workspaceMemberService.getMemberById(
      currentUserId,
      workspaceId
    );
    if (!member) {
      throw new ForbiddenException(`You are not a member of this workspace`);
    }

    const isAllowed = PolicyService.can(
      member?.role,
      WorkspaceAction.UPDATE_WORKSPACE_INFO,
      member.permissions
    );
    if (!isAllowed) {
      throw new ForbiddenException(
        `You do not have permission to update this workspace`
      );
    }

    const workspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace ${workspaceId} not found`);
    }

    Object.assign(workspace, updateWorkspaceDto);

    const updated = await this.workspaceRepository.save(workspace);
    return updated;
  }

  async deleteWorkspace(workspaceId: string, userId: string): Promise<void> {
    const member = await this.workspaceMemberService.getMemberById(
      userId,
      workspaceId
    );
    if (!member) {
      throw new ForbiddenException(`You are not a member of this workspace`);
    }

    const isAllowed = PolicyService.can(
      member?.role,
      WorkspaceAction.DELETE_WORKSPACE,
      member.permissions
    );
    if (!isAllowed) {
      throw new ForbiddenException(
        `You do not have permission to delete this workspace`
      );
    }

    const workspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
      relations: ["owner"],
    });
    if (!workspace) {
      throw new NotFoundException(`Workspace ${workspaceId} not found`);
    }
    await this.workspaceRepository.remove(workspace);
  }

  async incrementWorkspaceStats(
    workspaceId: string,
    field: "totalMembers" | "totalProject",
    increment: number
  ): Promise<void> {
    const updateField = field.replace(/([A-Z])/g, "_$1").toLowerCase();
    await this.workspaceRepository
      .createQueryBuilder()
      .update(Workspace)
      .set({
        [field]: () => `"${updateField}" + ${increment}`,
      })
      .where("id = :workspaceId", { workspaceId })
      .execute();
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

  async getAllWorkspaces(): Promise<Workspace[]> {
    const workspaces = await this.workspaceRepository.find();
    return workspaces;
  }
}
