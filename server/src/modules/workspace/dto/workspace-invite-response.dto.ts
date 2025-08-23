import { InviteStatus } from "../constants/invite-status.constant";
import { UserSummaryResponseDto } from "src/modules/user/dto/user-summary-response.dto";
import { WorkspaceSummaryResponseDto } from "./workspace-summary-response.dto";

export class WorkspaceInviteResponseDto {
  id!: string;
  workspace!: WorkspaceSummaryResponseDto;
  invitedBy!: UserSummaryResponseDto;
  invitedUser!: UserSummaryResponseDto;
  status!: InviteStatus;
  invitedAt!: Date;
  responsedAt!: Date;
}
