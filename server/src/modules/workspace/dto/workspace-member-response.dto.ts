import { WorkspaceRole } from "../constants/workspace-role.constant";

export class WorkspaceMemberResponseDto {
  id!: string;
  fullName!: string;
  avatarUrl!: string;
  email!: string;
  role!: WorkspaceRole;
  joinedAt!: Date;
}
