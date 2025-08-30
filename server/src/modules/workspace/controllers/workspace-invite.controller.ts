import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { WorkspaceInviteResponseDto } from "../dto";
import { WorkspaceInviteService } from "../services/workspace-invite.service";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller("workspaces")
@UseGuards(AuthGuard("jwt"))
export class WorkspaceInviteController {
  constructor(
    private readonly workspaceInviteService: WorkspaceInviteService
  ) {}

  @Post("invite/:workspaceId")
  async createInvite(
    @Param("workspaceId") workspaceId: string,
    @Body("inviterId") inviterId: string,
    @Body("invitedId") invitedId: string
  ): Promise<any> {
    await this.workspaceInviteService.createInvite(
      workspaceId,
      inviterId,
      invitedId
    );
    return { success: true };
  }

  @Patch("invite/respond/:inviteId")
  async respondToInvite(
    @Param("inviteId") inviteId: string,
    @CurrentUser() currentUser: any,
    @Body("accept") accept: boolean
  ): Promise<any> {
    await this.workspaceInviteService.respondToInvite(
      inviteId,
      currentUser?.id,
      accept
    );
    return { success: true };
  }

  @Get("invites/:userId")
  async getInvitesForUser(@Param("userId") userId: string): Promise<any> {
    const invites = await this.workspaceInviteService.getInvitesForUser(userId);
    return { success: true, data: invites };
  }
}
