import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workspace } from "./entities/workspace.entity";
import { WorkspaceMember } from "./entities/workspace-member.entity";
import { WorkspaceInvite } from "./entities/workspace-invite.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceMember, WorkspaceInvite]),
  ],
  controllers: [],
  providers: [],
})
export class WorkspaceModule {}
