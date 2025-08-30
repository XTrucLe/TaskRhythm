import { IsEnum, IsOptional } from "class-validator";
import { InviteStatus } from "../../constants/invite-status.constant";

export class UpdateWorkspaceInviteDto {
  @IsEnum(InviteStatus)
  @IsOptional()
  status?: InviteStatus;
}
