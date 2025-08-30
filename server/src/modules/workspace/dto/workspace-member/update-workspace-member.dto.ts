import { IsEnum, IsOptional } from "class-validator";
import { WorkspaceRole } from "../../constants/workspace-role.constant";

export class UpdateWorkspaceMemberDto {
  @IsEnum(WorkspaceRole)
  @IsOptional()
  role?: WorkspaceRole;
}
