import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workspace } from "./entities/workspace.entity";
import { WorkspaceMember } from "./entities/workspace-member.entity";
import { WorkspaceInvite } from "./entities/workspace-invite.entity";
import { WorkspaceController } from "./controllers/workspace.controller";
import { WorkspaceMemberController } from "./controllers/workspace-member.controller";
import { WorkspaceInviteController } from "./controllers/workspace-invite.controller";
import { WorkspaceMemberService } from "./services/workspace-member.service";
import { WorkspaceService } from "./services/workspace.service";
import { WorkspaceInviteService } from "./services/workspace-invite.service";
import { UserModule } from "../user/user.module";
import { WorkspaceMemberMapper } from "./mappers/workspace-member.mapper";
import { WorkspaceInviteMapper } from "./mappers/workspace-invite.mapper";
import { ProjectModule } from "../project/project.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceMember, WorkspaceInvite]),
    UserModule,
    forwardRef(() => ProjectModule),
  ],
  controllers: [
    WorkspaceController,
    WorkspaceMemberController,
    WorkspaceInviteController,
  ],
  providers: [
    WorkspaceService,
    WorkspaceMemberService,
    WorkspaceInviteService,
    WorkspaceMemberMapper,
    WorkspaceInviteMapper,
  ],
  exports: [WorkspaceService, WorkspaceMemberService, WorkspaceInviteService],
})
export class WorkspaceModule {}
