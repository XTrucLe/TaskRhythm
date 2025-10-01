import { MilestoneStatus } from "../../constants/milestone.constant";

export class MilestoneResponseDto {
  id!: string;
  workspaceId!: string;
  name!: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  status!: MilestoneStatus;
  order!: number;
  createdAt!: string;
  updatedAt!: string;
}
