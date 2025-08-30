import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from "class-validator";
import { WorkspaceStatus } from "../../constants/workspace-status.constant";
import { WorkspaceType } from "../../constants/workspace-type.constant";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(WorkspaceType)
  @IsOptional()
  type?: WorkspaceType;

  @ValidateIf((o) => o.type === WorkspaceType.Team)
  @IsInt()
  @Min(6)
  @IsOptional()
  maxMembers?: number;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsEnum(WorkspaceStatus)
  @IsOptional()
  status?: WorkspaceStatus;

  @IsOptional()
  settings?: Record<string, any>;
}
