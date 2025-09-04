import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { WorkspaceInviteResponseDto } from "../dto";
import { WorkspaceInviteService } from "../services/workspace-invite.service";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { WorkspaceInviteMapper } from "../mappers/workspace-invite.mapper";
import { InviteStatus } from "../constants/invite-status.constant";

@Controller("workspaces/:workspaceId/invites")
@UseGuards(AuthGuard("jwt"))
export class WorkspaceInviteController {
  constructor(
    private readonly inviteService: WorkspaceInviteService,
    private readonly mapper: WorkspaceInviteMapper
  ) {}

  @Post()
  async sendInvite(
    @CurrentUser("id") userId: string,
    @Param("workspaceId") workspaceId: string,
    @Body("invitedUserId") invitedUserId: string
  ) {
    const invite = await this.inviteService.sendInvite(
      workspaceId,
      userId,
      invitedUserId
    );
    return { message: "Invite sent successfully", invite };
  }

  @Patch(":inviteId/accept")
  async acceptInvite(
    @CurrentUser("id") userId: string,
    @Param("inviteId") inviteId: string
  ) {
    await this.inviteService.acceptInvite(inviteId, userId);
    return { message: "Invite accepted, joined workspace" };
  }

  @Patch(":inviteId/decline")
  async declineInvite(
    @CurrentUser("id") userId: string,
    @Param("inviteId") inviteId: string
  ) {
    await this.inviteService.declineInvite(inviteId, userId);
    return { message: "Invite declined" };
  }

  @Patch(":inviteId/resend")
  async resendInvite(
    @CurrentUser("id") userId: string,
    @Param("inviteId") inviteId: string
  ) {
    await this.inviteService.resendInvite(inviteId, userId);
    return { message: "Invite resent" };
  }

  @Delete(":inviteId")
  async cancelInvite(
    @CurrentUser("id") userId: string,
    @Param("inviteId") inviteId: string
  ) {
    await this.inviteService.cancelInvite(inviteId, userId);
    return { message: "Invite cancelled" };
  }

  @Get("/my/pending")
  async getMyPendingInvites(@CurrentUser("id") userId: string) {
    const invites = await this.inviteService.getPendingInvitesByUser(userId);
    return { totalCount: invites.length, items: invites };
  }

  @Get()
  async listWorkspaceInvites(
    @Param("workspaceId") workspaceId: string,
    @Query("status") status?: InviteStatus
  ) {
    const invites = await this.inviteService.listInvitesByWorkspace(
      workspaceId,
      status
    );
    return { totalCount: invites.length, items: invites };
  }
}
