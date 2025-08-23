import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { WorkspaceRole } from "../constants/workspace-role.constant";

export class CreateWorkspaceMemberDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsEnum(WorkspaceRole)
  role!: WorkspaceRole;
}
