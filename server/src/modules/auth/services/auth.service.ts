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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource // Assuming you have a DataSource injected for database operations
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
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.authRepository.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    return this.generateTokens(user);
  }

  private async generateTokens(user: Auth): Promise<TokenDto> {
    const accessToken = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }
}
