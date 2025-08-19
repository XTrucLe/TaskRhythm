import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { JwtConfigModule } from "src/config/jwt-config.module";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), JwtConfigModule, UserModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
