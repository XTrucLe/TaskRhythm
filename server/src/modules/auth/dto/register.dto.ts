import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class RegisterDto extends CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password!: string;
}
