import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  milestoneId!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}