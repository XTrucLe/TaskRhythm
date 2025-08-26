import { IsEnum, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { WorkspaceRole } from "../constants/workspace-role.constant";

export class WorkspacePolicyContext {
  @IsEnum(WorkspaceRole, { message: "role must be a valid WorkspaceRole" })
  role!: WorkspaceRole;

  @IsNotEmpty({ message: "userId must not be empty" })
  userId!: string;

  @IsObject({ message: "permissions must be an object" })
  @IsOptional()
  permissions?: Record<string, boolean>;

  @IsNotEmpty({ message: "ownerId must not be empty" })
  ownerId!: string;
}
