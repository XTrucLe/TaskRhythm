import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

class PasswordBaseDto {
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/(?=.*[a-z])/, {
    message: "Password must contain a lowercase letter",
  })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain an uppercase letter",
  })
  @Matches(/(?=.*\d)/, { message: "Password must contain a number" })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: "Password must contain a special character",
  })
  newPassword!: string;
}

export class ResetPasswordDto extends PasswordBaseDto {
  @IsString()
  @IsNotEmpty()
  otp!: string;
}

export class ChangePasswordDto extends PasswordBaseDto {
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;
}
