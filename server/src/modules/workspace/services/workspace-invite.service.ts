import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "src/modules/user/services/user.service";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceInvite } from "../entities/workspace-invite.entity";
import { WorkspaceMemberService } from "./workspace-member.service";
import { InviteStatus } from "../constants/invite-status.constant";
import { WorkspaceRole } from "../constants/workspace-role.constant";
import { PolicyService } from "./policy.service";
import { WorkspaceAction } from "../constants/workspace_action.constant";

@Injectable()
export class WorkspaceInviteService {
  constructor(
    @InjectRepository(WorkspaceInvite)
    private inviteRepository: Repository<WorkspaceInvite>,
    private readonly userService: UserService,
    private readonly workspaceMemberService: WorkspaceMemberService,
    private workspaceService: WorkspaceService
  ) {}

  async sendInvite(
    workspaceId: string,
    inviterId: string,
    invitedId: string
  ): Promise<WorkspaceInvite> {
    // Ensure inviter is a member and has permission
    const inviter = await this.workspaceMemberService.getMemberById(
      inviterId,
      workspaceId
    );
    PolicyService.assertCan(
      inviter.role,
      WorkspaceAction.INVITE_MEMBER,
      inviter.permissions
    );

    // Prevent inviting existing member
    const isMember = await this.workspaceMemberService.checkMembership(
      invitedId,
      workspaceId
    );
    if (isMember)
      throw new ConflictException("User is already a member of the workspace");

    const existingInvite = await this.inviteRepository.findOne({
      where: {
        workspace: { id: workspaceId },
        invitedUserId: invitedId,
        status: InviteStatus.PENDING,
      },
    });
    if (existingInvite)
      throw new ConflictException("Pending invite already exists");

    const invite = this.inviteRepository.create({
      workspace: { id: workspaceId },
      invitedBy: { id: inviterId },
      invitedById: inviterId,
      invitedUserId: invitedId,
      invitedUser: { id: invitedId },
      status: InviteStatus.PENDING,
    });

    return this.inviteRepository.save(invite);
  }

  async getPendingInvites(userId: string) {
    return this.inviteRepository.find({
      where: { invitedUserId: userId, status: InviteStatus.PENDING },
      relations: ["workspace", "invitedBy", "invitedUser"],
    });
  }

  async acceptInvite(inviteId: string, userId: string): Promise<void> {
    const invite = await this.getInviteForUser(inviteId, userId);
    this.isPending(invite);

    await this.workspaceMemberService.addMember({
      userId,
      workspaceId: invite.workspace.id,
      role: WorkspaceRole.MEMBER,
    });

    invite.status = InviteStatus.ACCEPTED;
    await this.inviteRepository.save(invite);
  }

  async declineInvite(inviteId: string, userId: string): Promise<void> {
    const invite = await this.getInviteForUser(inviteId, userId);
    this.isPending(invite);

    invite.status = InviteStatus.DECLINED;
    await this.inviteRepository.save(invite);
  }

  async cancelInvite(inviteId: string, actorId: string): Promise<void> {
    const invite = await this.inviteRepository.findOne({
      where: { id: inviteId },
      relations: ["workspace", "invitedBy"],
    });
    if (!invite) throw new NotFoundException("Invite not found");

    // Only inviter or workspace admin can cancel
    if (invite.invitedById !== actorId) {
      const actor = await this.workspaceMemberService.getMemberById(
        actorId,
        invite.workspace.id
      );
      PolicyService.assertCan(
        actor.role,
        WorkspaceAction.MANAGE_INVITES,
        actor.permissions
      );
    }

    invite.status = InviteStatus.CANCELLED;
    await this.inviteRepository.save(invite);
  }

  async resendInvite(inviteId: string, actorId: string): Promise<void> {
    const invite = await this.inviteRepository.findOne({
      where: { id: inviteId },
    });
    if (!invite) throw new NotFoundException("Invite not found");

    if (
      ![InviteStatus.DECLINED, InviteStatus.CANCELLED].includes(invite.status)
    ) {
      throw new ConflictException(
        "Only declined or cancelled invites can be resent"
      );
    }

    invite.status = InviteStatus.PENDING;
    invite.invitedById = actorId;
    await this.inviteRepository.save(invite);
  }

  async getPendingInvitesByUser(userId: string) {
    return this.inviteRepository.find({
      where: { invitedUserId: userId, status: InviteStatus.PENDING },
      relations: ["workspace", "invitedBy"],
    });
  }

  async listInvitesByWorkspace(workspaceId: string, status?: InviteStatus) {
    const where: any = { workspace: { id: workspaceId } };
    if (status) where.status = status;

    return this.inviteRepository.find({
      where,
      relations: ["workspace", "invitedBy", "invitedUser"],
    });
  }

  private async getInviteForUser(inviteId: string, userId: string) {
    const invite = await this.inviteRepository.findOne({
      where: { id: inviteId, invitedUserId: userId },
      relations: ["workspace", "invitedBy"],
    });
    if (!invite) {
      throw new NotFoundException(
        "Invite not found or you are not the invited user"
      );
    }
    return invite;
  }

  private isPending(invite: WorkspaceInvite) {
    if (invite.status !== InviteStatus.PENDING) {
      throw new ConflictException("Invite has already been responded to");
    }
  }
}
