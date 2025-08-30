import { Exclude, Expose } from "class-transformer";
import { WorkspaceRole } from "../../constants/workspace-role.constant";

@Exclude()
export class WorkspaceMemberResponseDto {
  @Expose() id!: string;
  @Expose() fullName!: string;
  @Expose() avatarUrl!: string;
  @Expose() email!: string;
  @Expose() role!: WorkspaceRole;
  @Expose() joinedAt!: Date;
}
