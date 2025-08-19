import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { UserService } from "./services/user.service";
import { RoleService } from "./services/role.service";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
  controllers: [UserController],
})
export class UserModule {}
