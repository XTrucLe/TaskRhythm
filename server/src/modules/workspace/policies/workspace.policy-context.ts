import { IsEnum, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { WorkspaceRole } from "../constants/workspace-role.constant";

export class WorkspacePolicyContext {
  @IsNotEmpty({ message: "userId must not be empty" })
  userId!: string;

  @IsNotEmpty({ message: "ownerId must not be empty" })
  ownerId!: string;
}

export class WorkspaceMemberPolicyContext extends WorkspacePolicyContext {
  @IsEnum(WorkspaceRole, { message: "role must be a valid WorkspaceRole" })
  role!: WorkspaceRole;

  @IsObject({ message: "permissions must be an object" })
  @IsOptional()
  permissions?: Record<string, boolean>;
}
