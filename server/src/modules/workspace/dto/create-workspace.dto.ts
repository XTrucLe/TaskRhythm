import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { WorkspaceStatus } from "../constants/workspace-status.constant";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(WorkspaceStatus)
  @IsOptional()
  status?: WorkspaceStatus;

  @IsOptional()
  settings?: Record<string, any>;
}
