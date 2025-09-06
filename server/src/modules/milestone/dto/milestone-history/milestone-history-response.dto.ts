import { MilestoneActionType } from "../../constants/milestone.constant";

export class MilestoneHistoryResponseDto {
  id!: string;
  milestoneId!: string;
  actorId!: string;
  actionType!: MilestoneActionType;
  previousValue?: any;
  newValue?: any;
  createdAt!: string;
}
