import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { InviteStatus } from "../../constants/invite-status.constant";

export class CreateWorkspaceInviteDto {
  @IsUUID()
  workspaceId!: string;

  @IsUUID()
  invitedById!: string;

  @IsUUID()
  invitedUserId!: string;

  @IsEnum(InviteStatus)
  @IsOptional()
  status?: InviteStatus;
}
