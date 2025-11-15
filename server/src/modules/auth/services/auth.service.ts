import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { PasswordUtils } from "src/common/utils/password.utils";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { TokenDto } from "../dto/token.dto";
import { UserService } from "src/modules/user/services/user.service";
import { ConfigService } from "@nestjs/config";
import { ChangePasswordDto, ResetPasswordDto } from "../dto/password.dto";

// Temporary in-memory store for refresh tokens (for demonstration purposes)
// In production, consider using a persistent store like Redis or a database
const passwordResetTokens = new Map<
  string,
  { userId: string; expiresAt: Date }
>();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService
  ) {}

  async register(authDto: RegisterDto): Promise<TokenDto> {
    const existing = await this.authRepository.findOne({
      where: { email: authDto.email },
    });
    if (existing) {
      throw new ConflictException(`Email ${authDto.email} already in use.`);
    }

    try {
      let tokens: TokenDto;

      await this.dataSource.transaction(async (manager) => {
        const user = await this.userService.create(authDto);
        await manager.save(user);

        const hashedPassword = await PasswordUtils.hashPassword(
          authDto.password
        );
        const auth = manager.create(Auth, {
          ...authDto,
          password: hashedPassword,
          user,
        });
        await manager.save(auth);

        tokens = await this.generateTokens(auth);
      });

      return tokens!;
    } catch (error) {
      throw new InternalServerErrorException(
        `Registration failed: ${(error as Error).message || error}`
      );
    }
  }

  async login(authDto: LoginDto): Promise<TokenDto> {
    const auth = await this.authRepository.findOne({
      where: { email: authDto.email },
      relations: ["user", "user.role"],
    });

    if (
      !auth ||
      !(await PasswordUtils.comparePasswords(authDto.password, auth.password))
    ) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.generateTokens(auth);
  }

  async refreshToken(refreshToken: string): Promise<TokenDto> {
    const secret = this.configService.get<string>("REFRESH_TOKEN_SECRET");

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, { secret });
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const auth = await this.authRepository.findOne({
      where: { user: { id: payload.sub } },
      relations: ["user", "user.role"],
    });

    if (!auth) {
      throw new UnauthorizedException("User not found for this token");
    }

    return {
      accessToken: this.generateAccessToken(auth),
      refreshToken,
    };
  }

  private async generateTokens(auth: Auth): Promise<TokenDto> {
    return {
      accessToken: this.generateAccessToken(auth),
      refreshToken: this.generateRefreshToken(auth),
    };
  }

  private generateAccessToken(auth: Auth): string {
    const payload = {
      sub: auth.user.id,
      email: auth.email,
      role: auth.user.role?.name || "user",
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_EXPIRATION_IN") || "15m",
    });
  }

  private generateRefreshToken(auth: Auth): string {
    return this.jwtService.sign(
      { sub: auth.user.id },
      {
        secret: this.configService.get("REFRESH_TOKEN_SECRET"),
        expiresIn:
          this.configService.get("REFRESH_TOKEN_EXPIRATION_IN") || "7d",
      }
    );
  }

  // Password reset and other auth-related methods
  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const { currentPassword, newPassword } = dto;
    const auth = await this.authRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!auth) {
      throw new UnauthorizedException("User not found");
    }

    const isMatch = await PasswordUtils.comparePasswords(
      currentPassword,
      auth.password
    );

    if (!isMatch) {
      throw new ConflictException("Current password is incorrect");
    }

    if (currentPassword === newPassword) {
      throw new ConflictException(
        "New password must be different from the current password"
      );
    }

    auth.password = await PasswordUtils.hashPassword(newPassword);
    await this.authRepository.save(auth);
  }

  async forgotPassword(email: string): Promise<void> {
    const auth = await this.authRepository.findOne({
      where: { email },
      relations: ["user"],
    });
    if (!auth) {
      throw new UnauthorizedException("User not found");
    }

    const resetToken = (Math.random() * 1000000).toFixed(0).padStart(6, "0");
    const expiresAt = new Date(Date.now() + 180 * 1000);
    passwordResetTokens.set(resetToken, { userId: auth.user.id, expiresAt });

    Logger.log(
      `Password reset token for user ${email}: ${resetToken} (expires in 3 minutes)`
    );
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const { otp, newPassword } = dto;
    const record = passwordResetTokens.get(otp);
    if (!record) {
      throw new UnauthorizedException(
        "Invalid or expired password reset token"
      );
    }
    const { userId, expiresAt } = record;

    if (expiresAt < new Date()) {
      passwordResetTokens.delete(otp);
      throw new UnauthorizedException("Password reset token has expired");
    }

    const account = await this.authRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!account) {
      throw new UnauthorizedException("User not found");
    }

    const hashedPassword = await PasswordUtils.hashPassword(newPassword);
    account.password = hashedPassword;
    await this.authRepository.save(account);

    passwordResetTokens.delete(otp);
  }
}
