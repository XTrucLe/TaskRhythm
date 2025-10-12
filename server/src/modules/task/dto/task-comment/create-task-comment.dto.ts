import { IsString, IsOptional } from "class-validator";

export class CreateTaskCommentDto {
  @IsString()
  content!: string;

  @IsString()
  @IsOptional()
  parentCommentId?: string;
}
