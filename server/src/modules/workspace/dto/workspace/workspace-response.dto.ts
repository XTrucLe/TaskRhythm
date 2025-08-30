import { Exclude, Expose } from "class-transformer";
import { WorkspaceStatus } from "../../constants/workspace-status.constant";

@Exclude()
export class WorkspaceResponseDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() type!: string;
  @Expose() maxMembers!: number;
  @Expose() description?: string;
  @Expose() status!: WorkspaceStatus;
  @Expose() inviteCode?: string;
  @Expose() logoUrl?: string;
  @Expose() settings?: Record<string, any>;
  @Expose() ownerId!: string;
  @Expose() totalMembers!: number;
  @Expose() totalModules!: number;
  @Expose() totalTasks!: number;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
}
