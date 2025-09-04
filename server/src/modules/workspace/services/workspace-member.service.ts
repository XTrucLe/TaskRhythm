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
import { WorkspaceRoleLimit } from "../constants/workspace_role_limit.constant";
import { PolicyService } from "./policy.service";
import { WorkspaceAction } from "../constants/workspace_action.constant";
import { UpdateRoleDto } from "../dto/workspace-member/update-member-role.dto";

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

    const roleLimit = WorkspaceRoleLimit[role];
    const currentMemberCount = await this.workspaceMemberRepository.count({
      where: { workspace: { id: workspaceId }, role },
    });

    if (currentMemberCount >= roleLimit) {
      throw new ForbiddenException(
        `Cannot add more ${role} members to workspace`
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

  async leaveWorkspace(actorId: string, workspaceId: string): Promise<void> {
    const actor = await this.getMemberById(actorId, workspaceId);

    PolicyService.assertCan(
      actor.role,
      WorkspaceAction.LEAVE_WORKSPACE,
      actor.permissions
    );

    await this.workspaceMemberRepository.remove(actor);
  }

  async removeMember(
    actorId: string,
    targetId: string,
    workspaceId: string
  ): Promise<void> {
    const actor = await this.getMemberById(actorId, workspaceId);

    PolicyService.assertCan(
      actor.role,
      WorkspaceAction.REMOVE_MEMBER,
      actor.permissions
    );

    const member = await this.getMemberById(targetId, workspaceId);

    if (member.role === WorkspaceRole.LEADER) {
      throw new ForbiddenException("Cannot remove the workspace owner");
    }

    await this.workspaceMemberRepository.remove(member);
  }

  async changeMemberRole(
    currentUserId: string,
    updateRoleDto: UpdateRoleDto
  ): Promise<WorkspaceMember> {
    const { targetUserId, role, workspaceId } = updateRoleDto;
    const actor = await this.getMemberById(currentUserId, workspaceId);

    PolicyService.assertCan(
      actor.role,
      WorkspaceAction.UPDATE_MEMBER_ROLE,
      actor.permissions
    );

    const member = await this.getMemberById(targetUserId, workspaceId);

    if (member.role === role)
      throw new ConflictException(`Member is already in ${role} role`);

    await this.validateRoleCapacity(workspaceId, role);

    member.role = role;
    await this.workspaceMemberRepository.save(member);
    return member;
  }

  async transferOwnership(
    userId: string,
    workspaceId: string,
    newOwnerId: string
  ): Promise<void> {
    const member = await this.getMemberById(userId, workspaceId);
    PolicyService.assertCan(
      member.role,
      WorkspaceAction.TRANSFER_OWNERSHIP,
      member.permissions
    );
    member.workspace.ownerId = newOwnerId;
    await this.workspaceMemberRepository.save(member);
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
      throw new NotFoundException(`Workspace member not found`);
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

  async listMembersByRole(
    workspaceId: string,
    role: WorkspaceRole
  ): Promise<WorkspaceMember[]> {
    return this.workspaceMemberRepository.find({
      where: { workspace: { id: workspaceId }, role },
      relations: ["user"],
    });
  }

  async checkMembership(userId: string, workspaceId: string): Promise<boolean> {
    return this.workspaceMemberRepository.exists({
      where: { user: { id: userId }, workspace: { id: workspaceId } },
    });
  }

  private async validateRoleCapacity(
    workspaceId: string,
    role: WorkspaceRole
  ): Promise<void> {
    const roleLimit = WorkspaceRoleLimit[role];
    const currentMemberCount = await this.workspaceMemberRepository.count({
      where: { workspace: { id: workspaceId }, role },
    });
    if (currentMemberCount >= roleLimit) {
      throw new ForbiddenException(
        `Cannot promote member to ${role} role because of role limit is ${roleLimit}`
      );
    }
  }
}
