import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { WorkspaceMemberService } from "../services/workspace-member.service";
import { CreateWorkspaceMemberDto, WorkspaceMemberResponseDto } from "../dto";
import { WorkspaceMemberMapper } from "../mappers/workspace-member.mapper";
import { UpdateRoleDto } from "../dto/workspace-member/update-member-role.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { WorkspaceRole } from "../constants/workspace-role.constant";

@Controller("workspaces/:workspaceId/members")
@UseGuards(AuthGuard("jwt"))
export class WorkspaceMemberController {
  constructor(
    private readonly workspaceMemberService: WorkspaceMemberService,
    private readonly mapper: WorkspaceMemberMapper
  ) {}

  @Post()
  async addMember(
    @Param("workspaceId") workspaceId: string,
    @Body() dto: CreateWorkspaceMemberDto
  ) {
    dto.workspaceId = workspaceId;
    const member = await this.workspaceMemberService.addMember(dto);
    return this.mapper.toDto(member);
  }

  @Get()
  async listMembers(@Param("workspaceId") workspaceId: string) {
    const members = await this.workspaceMemberService.listMembersByWorkspaceId(
      workspaceId
    );
    return this.mapper.toDtos(members);
  }

  @Get("by-role")
  async listMembersByRole(
    @Param("workspaceId") workspaceId: string,
    @Query("role") role: WorkspaceRole
  ) {
    const members = await this.workspaceMemberService.listMembersByRole(
      workspaceId,
      role
    );
    return this.mapper.toDtos(members);
  }

  @Delete("leave")
  async leaveWorkspace(
    @CurrentUser() curentUser: any,
    @Param("workspaceId") workspaceId: string
  ) {
    await this.workspaceMemberService.leaveWorkspace(
      curentUser.id,
      workspaceId
    );
    return { message: "Left workspace successfully" };
  }

  @Delete(":memberId")
  async removeMember(
    @CurrentUser() curentUser: any,
    @Param("workspaceId") workspaceId: string,
    @Param("memberId") memberId: string
  ) {
    await this.workspaceMemberService.removeMember(
      curentUser.id,
      memberId,
      workspaceId
    );
    return { message: "Removed member successfully" };
  }

  @Patch(":memberId/role")
  async updateRole(
    @CurrentUser() curentUser: any,
    @Param("workspaceId") workspaceId: string,
    @Param("memberId") targetUserId: string,
    @Body() body: { role: WorkspaceRole }
  ) {
    const dto: UpdateRoleDto = {
      workspaceId,
      targetUserId,
      role: body.role,
    };
    const updated = await this.workspaceMemberService.changeMemberRole(
      curentUser.id,
      dto
    );
    return this.mapper.toDto(updated);
  }

  // 👑 Transfer ownership (chỉ cho leader)
  @Patch("transfer-ownership/:newOwnerId")
  async transferOwnership(
    @CurrentUser() curentUser: any,
    @Param("workspaceId") workspaceId: string,
    @Param("newOwnerId") newOwnerId: string
  ) {
    await this.workspaceMemberService.transferOwnership(
      curentUser.id,
      workspaceId,
      newOwnerId
    );
    return { message: "Ownership transferred successfully" };
  }
}
