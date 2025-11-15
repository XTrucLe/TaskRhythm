import { IsString } from "class-validator";

export class AccessTokenDto {
  @IsString()
  accessToken!: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class TokenDto extends AccessTokenDto {
  @IsString()
  refreshToken!: string;
}
