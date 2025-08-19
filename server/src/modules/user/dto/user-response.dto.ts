import { IsOptional, IsString, IsEnum } from "class-validator";
import { UserGender } from "../constants/user-gender.enum";

export class UserResponseDto {
  @IsString()
  id!: string;

  @IsString()
  email!: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserGender)
  gender?: UserGender;

  @IsOptional()
  @IsString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
