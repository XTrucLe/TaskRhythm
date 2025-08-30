import { Body, Param, Controller, Get } from "@nestjs/common";
import { WorkspaceMemberService } from "../services/workspace-member.service";
import { WorkspaceMemberResponseDto } from "../dto";
import { WorkspaceMemberMapper } from "../mappers/workspace-member.mapper";

@Controller("workspaces/members")
export class WorkspaceMemberController {
  private readonly mapper: WorkspaceMemberMapper;
  constructor(private readonly workspaceMemberService: WorkspaceMemberService) {
    this.mapper = new WorkspaceMemberMapper();
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string
  ): Promise<WorkspaceMemberResponseDto[]> {
    const member = await this.workspaceMemberService.findByWorkspaceId(id);
    return this.mapper.toDtos(member);
  }
}
