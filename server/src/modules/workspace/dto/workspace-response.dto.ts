import { WorkspaceStatus } from "../constants/workspace-status.constant";

export class WorkspaceResponseDto {
  id!: string;
  name!: string;
  description?: string;
  status!: WorkspaceStatus;
  settings?: Record<string, any>;
  ownerId!: string;
  membersCount!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
