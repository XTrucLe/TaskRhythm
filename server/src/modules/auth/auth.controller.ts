import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { TokenDto } from "./dto/token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() registerDto: RegisterDto): Promise<TokenDto> {
    const tokens = await this.authService.register(registerDto);
    return tokens;
  }

  @Post("/login")
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const tokens = await this.authService.login(loginDto);
    return tokens;
  }

  @Post("refresh-token")
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<TokenDto> {
    // Gọi service trả về TokenDto
    const tokens = await this.authService.refreshToken(refreshTokenDto);
    return tokens;
  }
}
