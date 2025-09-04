import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "src/modules/user/services/user.service";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceInvite } from "../entities/workspace-invite.entity";
import { WorkspaceMemberService } from "./workspace-member.service";
import { InviteStatus } from "../constants/invite-status.constant";
import { WorkspaceRole } from "../constants/workspace-role.constant";

@Injectable()
export class WorkspaceInviteService {
  constructor(
    @InjectRepository(WorkspaceInvite)
    private InviteRepo: Repository<WorkspaceInvite>,
    private readonly userService: UserService,
    private readonly workspaceMemberService: WorkspaceMemberService,
    private workspaceService: WorkspaceService
  ) {}

  async createInvite(
    workspaceId: string,
    inviterId: string,
    invitedId: string
  ) {
    const isMember = await this.workspaceMemberService.checkMembership(
      invitedId,
      workspaceId
    );
    if (isMember) {
      throw new ConflictException("User is already a member of the workspace");
    }

    const existingInvite = await this.InviteRepo.findOne({
      where: { workspace: { id: workspaceId }, invitedUserId: invitedId },
    });
    if (existingInvite) {
      throw new ConflictException("Invite already exists");
    }

    const invite = this.InviteRepo.create({
      workspace: { id: workspaceId },
      invitedBy: { id: inviterId },
      invitedById: inviterId,
      invitedUserId: invitedId,
      invitedUser: { id: invitedId },
      status: InviteStatus.PENDING,
    });
    await this.InviteRepo.save(invite);
  }

  async getPendingInvites(userId: string) {
    return this.InviteRepo.find({
      where: { invitedUserId: userId, status: InviteStatus.PENDING },
      relations: ["workspace", "invitedBy", "invitedUser"],
    });
  }

  async respondToInvite(
    inviteId: string,
    userId: string,
    accept: boolean
  ): Promise<void> {
    const invite = await this.InviteRepo.findOne({
      where: { id: inviteId, invitedUserId: userId },
      relations: ["workspace", "invitedBy"],
    });
    if (!invite) {
      throw new ConflictException(
        "Invite not found or you are not the invited user"
      );
    }
    if (invite.status !== InviteStatus.PENDING) {
      throw new ConflictException("Invite has already been responded to");
    }

    if (accept) {
      await this.workspaceMemberService.addMember({
        userId,
        workspaceId: invite.workspace.id,
        role: WorkspaceRole.MEMBER,
      });
      invite.status = InviteStatus.ACCEPTED;
    } else {
      invite.status = InviteStatus.DECLINED;
    }
    await this.InviteRepo.save(invite);
  }

  async getPendingInviteForWorkspace(workspaceId: string) {
    return this.InviteRepo.find({
      where: { workspace: { id: workspaceId }, status: InviteStatus.PENDING },
      relations: ["workspace", "invitedBy", "invitedUser"],
    });
  }
}
