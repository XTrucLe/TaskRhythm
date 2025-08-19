import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { PasswordUtils } from "src/common/utils/password.utils";
import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { RegisterDto } from "../dto/register.dto";
import { TokenDto } from "../dto/token.dto";
import { DataSource, Repository } from "typeorm";
import { UserService } from "src/modules/user/services/user.service";
import { ConfigService } from "@nestjs/config";

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
    const existingAuth = await this.authRepository.findOne({
      where: { email: authDto.email },
    });
    if (existingAuth) {
      throw new ConflictException(
        `Email ${authDto.email} already in use. Please choose another one.`
      );
    }

    try {
      let auth: Auth;
      let tokens: TokenDto;
      await this.dataSource.transaction(async (entityManager) => {
        const user = await this.userService.create(authDto);
        await entityManager.save(user);
        const hashedPassword = await PasswordUtils.hashPassword(
          authDto.password
        );
        auth = entityManager.create(Auth, {
          ...authDto,
          password: hashedPassword,
          user: user,
        });

        await entityManager.save(auth);
        tokens = await this.generateTokens(auth);
      });
      return tokens!;
    } catch (error) {
      throw new ConflictException(`Error creating account with ${error}`);
    }
  }

  async login(authDto: LoginDto): Promise<TokenDto> {
    const user = await this.authRepository.findOne({
      where: { email: authDto.email },
      relations: ["user"],
    });
    if (
      !user ||
      !(await PasswordUtils.comparePasswords(authDto.password, user.password))
    ) {
      throw new UnauthorizedException("Invalid email or password");
    }
    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenDto> {
    const { refreshToken } = refreshTokenDto;

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get("REFRESH_TOKEN_SECRET"),
      });
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    // Tìm auth entity kèm relation user và role
    const auth = await this.authRepository.findOne({
      where: { user: { id: payload.sub } }, // dùng sub thay vì id
      relations: ["user", "user.role"],
    });

    if (!auth || !auth.user) {
      throw new UnauthorizedException("User associated with token not found");
    }

    // Tạo token mới
    return { accessToken: this.generateAccessToken(auth), refreshToken };
  }

  private async generateTokens(auth: Auth): Promise<TokenDto> {
    return {
      accessToken: this.generateAccessToken(auth),
      refreshToken: this.generateRefreshToken(auth),
    };
  }

  // Tạo access token
  private generateAccessToken(auth: Auth): string {
    if (!auth.user || !auth.user.role)
      throw new Error("User or role not found");

    const payload = {
      sub: auth.user.id,
      email: auth.email,
      role: auth.user.role.name,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_EXPIRATION_IN") || "15m",
    });
  }

  // Tạo refresh token
  private generateRefreshToken(auth: Auth): string {
    if (!auth.user) throw new Error("User not found");

    const payload = { sub: auth.user.id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get("REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRATION_IN") || "7d",
    });
  }
}
