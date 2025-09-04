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
import { WorkspaceInviteMapper } from "../mappers/workspace-invite.mapper";

@Controller("workspaces")
@UseGuards(AuthGuard("jwt"))
export class WorkspaceInviteController {
  private readonly mapper: WorkspaceInviteMapper;
  constructor(private readonly workspaceInviteService: WorkspaceInviteService) {
    this.mapper = new WorkspaceInviteMapper();
  }

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

  @Get("invites/getPendingInvites")
  async getInvitesForUser(
    @CurrentUser() currentUser: any
  ): Promise<WorkspaceInviteResponseDto[]> {
    const invites = await this.workspaceInviteService.getPendingInvites(
      currentUser?.id
    );
    return this.mapper.toDtos(invites);
  }
  @Get("invites/workspace/:workspaceId")
  async getPendingInvitesForWorkspace(
    @Param("workspaceId") workspaceId: string
  ): Promise<WorkspaceInviteResponseDto[]> {
    const invites =
      await this.workspaceInviteService.getPendingInviteForWorkspace(
        workspaceId
      );
    return this.mapper.toDtos(invites);
  }
}
