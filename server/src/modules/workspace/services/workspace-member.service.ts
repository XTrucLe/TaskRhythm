import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { WorkspaceMember } from "../entities/workspace-member.entity";
import { CreateWorkspaceMemberDto } from "../dto";
import { WorkspaceRole } from "../constants/workspace-role.constant";
import { UserService } from "src/modules/user/services/user.service";
import { WorkspaceService } from "./workspace.service";

@Injectable()
export class WorkspaceMemberService {
  constructor(
    @InjectRepository(WorkspaceMember)
    private workspaceMemberRepository: Repository<WorkspaceMember>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => WorkspaceService))
    private workspaceService: WorkspaceService
  ) {}

  async addMember(
    createWorkspaceMemberDto: CreateWorkspaceMemberDto,
    manager?: EntityManager
  ): Promise<WorkspaceMember> {
    const { userId, workspaceId, role } = createWorkspaceMemberDto;

    const user = await this.userService.getUserEntity(userId);
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);

    const existingMember = await this.workspaceMemberRepository.exists({
      where: { user: { id: userId }, workspace: { id: workspaceId } },
    });

    if (existingMember) {
      throw new ConflictException(
        `User with id ${userId} is already a member of workspace`
      );
    }

    const workspaceMember = this.workspaceMemberRepository.create({
      workspace,
      user,
      role,
    });

    const repo = manager
      ? manager.getRepository(WorkspaceMember)
      : this.workspaceMemberRepository;

    await repo.save(workspaceMember);
    return workspaceMember;
  }

  async removeMember(actorId: string, id: string): Promise<void> {
    const workspaceMember = await this.workspaceMemberRepository.findOne({
      where: { id },
    });

    if (!workspaceMember) {
      throw new NotFoundException(`Workspace member with id ${id} not found`);
    }

    await this.workspaceMemberRepository.remove(workspaceMember);
  }

  async leave(userId: string): Promise<void> {
    const member = await this.workspaceMemberRepository.findOne({
      where: { user: { id: userId } },
      relations: ["workspace"],
    });

    if (!member) {
      throw new NotFoundException(
        `Workspace member with user id ${userId} not found`
      );
    }

    await this.workspaceMemberRepository.remove(member);
  }

  async isMember(userId: string, workspaceId: string): Promise<boolean> {
    const member = await this.workspaceMemberRepository.findOne({
      where: { user: { id: userId }, workspace: { id: workspaceId } },
      relations: ["user", "workspace"],
      select: ["id"],
    });
    return !!member;
  }

  async findByWorkspaceId(workspaceId: string): Promise<WorkspaceMember[]> {
    return this.workspaceMemberRepository.find({
      where: { workspace: { id: workspaceId } },
      relations: ["user"],
    });
  }

  async updateRole(
    userId: string,
    role: WorkspaceRole
  ): Promise<WorkspaceMember> {
    // Implementation for updating a member's role in a workspace
    return new WorkspaceMember();
  }

  async getMemberById(
    userId: string,
    workspaceId: string
  ): Promise<WorkspaceMember> {
    const member = await this.workspaceMemberRepository.findOne({
      where: { user: { id: userId }, workspace: { id: workspaceId } },
      relations: ["user", "workspace"],
    });
    if (!member) {
      throw new NotFoundException(
        `Workspace member with user id ${userId} and workspace id ${workspaceId} not found`
      );
    }
    return member;
  }

  async listMembersByWorkspaceId(
    workspaceId: string
  ): Promise<WorkspaceMember[]> {
    return this.workspaceMemberRepository.find({
      where: { workspace: { id: workspaceId } },
      relations: ["user"],
    });
  }

  async transferOwnership(
    userId: string,
    workspaceId: string,
    newOwnerId: string
  ): Promise<void> {
    const member = await this.getMemberById(userId, workspaceId);

    member.workspace.ownerId = newOwnerId;
    await this.workspaceMemberRepository.save(member);
  }
}
