import { Body, Param, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { WorkspaceMemberService } from "../services/workspace-member.service";
import { WorkspaceMemberResponseDto } from "../dto";
import { WorkspaceMemberMapper } from "../mappers/workspace-member.mapper";
import { UpdateRoleDto } from "../dto/workspace-member/update-member-role.dto";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller("workspaces/members")
@UseGuards(AuthGuard("jwt"))
export class WorkspaceMemberController {
  private readonly mapper: WorkspaceMemberMapper;
  constructor(private readonly workspaceMemberService: WorkspaceMemberService) {
    this.mapper = new WorkspaceMemberMapper();
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string
  ): Promise<WorkspaceMemberResponseDto[]> {
    const member = await this.workspaceMemberService.listMembersByWorkspaceId(
      id
    );
    return this.mapper.toDtos(member);
  }

  @Post("update-role")
  async updateRole(
    @CurrentUser() currentUser: any,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<WorkspaceMemberResponseDto> {
    const member = await this.workspaceMemberService.changeMemberRole(
      currentUser.id,
      updateRoleDto
    );
    return this.mapper.toDto(member);
  }
}
