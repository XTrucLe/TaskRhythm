import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { WorkspaceRole } from "../../constants/workspace-role.constant";

export class CreateWorkspaceMemberDto {
  @IsUUID()
  @IsNotEmpty()
  workspaceId!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsEnum(WorkspaceRole)
  role!: WorkspaceRole;

  @IsUUID()
  @IsOptional()
  inviteBy?: string;
}
