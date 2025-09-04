import { IsEnum, IsString } from "class-validator";
import { WorkspaceRole } from "../../constants/workspace-role.constant";

export class UpdateRoleDto {
  @IsString()
  targetUserId!: string;
  @IsEnum(WorkspaceRole)
  role!: WorkspaceRole;
  @IsString()
  workspaceId!: string;
}
