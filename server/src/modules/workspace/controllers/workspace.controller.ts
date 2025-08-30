import { Body, Controller, Post, Get, Param, UseGuards } from "@nestjs/common";
import { WorkspaceService } from "./../services/workspace.service";
import { CreateWorkspaceDto } from "../dto";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { WorkspaceMapper } from "../mappers/workspace.mapper";

@Controller("workspaces")
@UseGuards(AuthGuard("jwt"))
export class WorkspaceController {
  private readonly mapper: WorkspaceMapper;
  constructor(private readonly workspaceService: WorkspaceService) {
    this.mapper = new WorkspaceMapper();
  }

  @Post("create")
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @CurrentUser() currentUser: any
  ) {
    const workspace = await this.workspaceService.createWorkspace(
      createWorkspaceDto,
      currentUser.id
    );
    return this.mapper.toDto(workspace);
  }
  @Get("all-workspaces")
  async getAllWorkspaces() {
    const workspaces = await this.workspaceService.getAllWorkspaces();
    return this.mapper.toDtos(workspaces);
  }

  @Get(":id")
  async getWorkspace(@Param("id") id: string) {
    const workspace = await this.workspaceService.getWorkspaceById(id);
    return this.mapper.toDto(workspace);
  }
}
