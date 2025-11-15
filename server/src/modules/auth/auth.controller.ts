import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AccessTokenDto } from "./dto/token.dto";
import { Response, Request } from "express";
import { ChangePasswordDto, ResetPasswordDto } from "./dto/password.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setRefreshTokenCookie(res: Response, token: string) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Post("/register")
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AccessTokenDto> {
    const { refreshToken, ...token } = await this.authService.register(
      registerDto
    );
    this.setRefreshTokenCookie(res, refreshToken);

    return token;
  }

  @Post("/login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AccessTokenDto> {
    const { refreshToken, ...token } = await this.authService.login(loginDto);
    this.setRefreshTokenCookie(res, refreshToken);

    return token;
  }

  @Post("/refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<AccessTokenDto> {
    const reqRefreshToken = req.cookies.refreshToken;
    if (!reqRefreshToken) {
      throw new Error("Refresh token not found");
    }

    const { refreshToken, ...token } = await this.authService.refreshToken(
      reqRefreshToken
    );
    this.setRefreshTokenCookie(res, refreshToken);

    return token;
  }

  @Post("/request-password-reset")
  async requestPasswordReset(@Body("email") email: string): Promise<string> {
    this.authService.forgotPassword(email);
    return "If the email is registered, a password reset token has been sent.";
  }

  @Post("/reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/change-password")
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @CurrentUser("id") currentUserId: string
  ): Promise<void> {
    return this.authService.changePassword(currentUserId, dto);
  }
}
