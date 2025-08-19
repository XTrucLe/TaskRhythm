import {
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsEnum,
  IsUrl,
  Matches,
} from "class-validator";
import { UserGender } from "../constants/user-gender.enum";

export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
    message: "Invalid phone number format for phoneNumber",
  })
  phoneNumber?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsEnum(UserGender)
  gender!: UserGender;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
