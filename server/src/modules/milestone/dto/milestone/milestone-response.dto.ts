import { MilestoneStatus } from "../../constants/milestone.constant";
import { SectionResponseDto } from "../section/section-response.dto";

export class MilestoneResponseDto {
  id!: string;
  workspaceId!: string;
  name!: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  status!: MilestoneStatus;
  order!: number;
  sections?: SectionResponseDto[];
  createdAt!: string;
  updatedAt!: string;
}
